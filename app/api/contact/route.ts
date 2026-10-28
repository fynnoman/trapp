import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  name?: string;
  kontakt?: string;
  vorhaben?: string;
  website?: string;
};

const MAX_LEN = {
  name: 120,
  kontakt: 160,
  vorhaben: 4000,
};

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (body.website && body.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim().slice(0, MAX_LEN.name);
  const kontakt = (body.kontakt ?? "").trim().slice(0, MAX_LEN.kontakt);
  const vorhaben = (body.vorhaben ?? "").trim().slice(0, MAX_LEN.vorhaben);

  if (!name || !kontakt || !vorhaben) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    console.error("[contact] missing env", {
      hasKey: Boolean(apiKey),
      hasFrom: Boolean(from),
      hasTo: Boolean(to),
    });
    return NextResponse.json({ ok: false, error: "server_misconfigured" }, { status: 500 });
  }

  const kontaktIsEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(kontakt);
  const replyTo = kontaktIsEmail ? kontakt : undefined;

  const subject = `Projektanfrage von ${name}`;
  const text = [
    `Name: ${name}`,
    `Kontakt: ${kontakt}`,
    "",
    "Vorhaben:",
    vorhaben,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#252421;line-height:1.6;font-size:15px;">
      <h2 style="margin:0 0 16px;font-weight:400;">Neue Projektanfrage</h2>
      <p style="margin:0 0 6px;"><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p style="margin:0 0 20px;"><strong>Kontakt:</strong> ${escapeHtml(kontakt)}</p>
      <p style="margin:0 0 6px;"><strong>Vorhaben:</strong></p>
      <div style="white-space:pre-wrap;padding:12px 14px;background:#f5f1ea;border-radius:10px;">${escapeHtml(vorhaben)}</div>
    </div>
  `.trim();

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to: to.split(",").map((v) => v.trim()).filter(Boolean),
      subject,
      text,
      html,
      replyTo,
    });

    if (error) {
      console.error("[contact] resend error", error);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (err) {
    console.error("[contact] unexpected error", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
