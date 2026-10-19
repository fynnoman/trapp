export const SITE = {
  name: "GdH Stuckateurmeister & Malerbetrieb",
  short: "GdH",
  inhaber: "Christoph Trapp",
  city: "Bous",
  region: "Saarland",
  street: "Leipziger Straße 14",
  zip: "66359",
  phoneDisplay: "0177 361 63 58",
  phoneHref: "+4917736163558",
  email: "Gdh.verputz@web.de",
  hours: "Montag bis Freitag, 07:30 bis 18:00",
  ustid: "DE452632565",
  pillars: ["Ordentlich", "Sauber", "Verbindlich"] as const,
};

export type Service = {
  slug: string;
  title: string;
  lede: string;
  body: string;
  tags: string[];
  tone: "clay" | "ink" | "stone";
  image: string;
  focal?: string;
};

export const SERVICES: Service[] = [
  {
    slug: "putz",
    title: "Innen- und Außenputz",
    lede: "Oberflächen, die bleiben.",
    body:
      "Von Grundputz über Reibeputz bis zur fein geriebenen Oberfläche. Innen glatt für klassische Räume, außen robust gegen Wetter und Zeit.",
    tags: ["Reibeputz", "Glättputz", "Fassadenputz", "Dekorputz"],
    tone: "stone",
    image: "/img/plaster-wall.jpg",
    focal: "center",
  },
  {
    slug: "trockenbau",
    title: "Trockenbau",
    lede: "Räume, die sich einfügen.",
    body:
      "Wände, Vorsatzschalen, abgehängte Decken, Dachschrägen. Sauber abgeklebt, exakt gespachtelt, bereit für Farbe oder Tapete.",
    tags: ["Ständerwände", "Decken", "Schallschutz", "Dachausbau"],
    tone: "ink",
    image: "/img/minimalist.jpg",
  },
  {
    slug: "spanndecken",
    title: "Spanndecken",
    lede: "Decke neu, ohne Baustelle.",
    body:
      "Clipso Textilspanndecken in Matt, Satin oder Akustik. Werkseitig zugeschnitten, vor Ort gespannt. Keine Risse, keine lange Trocknung.",
    tags: ["Clipso", "Akustik", "Lichtdecken", "Renovierung"],
    tone: "stone",
    image: "/img/ceiling-light.jpg",
  },
  {
    slug: "maler",
    title: "Malerarbeiten",
    lede: "Farbe mit System.",
    body:
      "Innenanstriche, Lasuren, Lackarbeiten an Türen und Rahmen, Außenanstriche. Beratung zu Farbton, Deckkraft und Material.",
    tags: ["Innenanstrich", "Lasur", "Lack", "Fassade"],
    tone: "clay",
    image: "/img/painter-hands.jpg",
  },
  {
    slug: "boeden",
    title: "Bodenbelagsarbeiten",
    lede: "Grundiert, gespachtelt, verlegt.",
    body:
      "Vorbereitung, Spachtelung und Verlegung von Vinyl, Design und textilen Belägen. Für Wohnräume, Praxen und Büros.",
    tags: ["Design", "Vinyl", "Textil", "Spachtelung"],
    tone: "ink",
    image: "/img/room-wood.jpg",
  },
  {
    slug: "geruest",
    title: "Gerüstbau",
    lede: "Sicher nach oben.",
    body:
      "Arbeits- und Fassadengerüste für die eigenen Baustellen. Standsicher aufgebaut, mit Rücksicht auf Nachbarschaft und Logistik.",
    tags: ["Fassadengerüst", "Arbeitsgerüst", "Absicherung"],
    tone: "clay",
    image: "/img/stuccato.jpg",
  },
];

export const IMG = {
  hero: "/img/plaster-wall.jpg",
  heroAccent: "/img/interior-light.jpg",
  statement: "/img/stuccato.jpg",
  processVorlauf: "/img/trowel.jpg",
  processAusfuehrung: "/img/painter-hands.jpg",
  processUebergabe: "/img/modern-living.jpg",
  galleryA: "/img/plaster-wall.jpg",
  galleryB: "/img/ceiling-light.jpg",
  galleryC: "/img/minimalist.jpg",
  galleryD: "/img/painter-hands.jpg",
  galleryE: "/img/stuccato.jpg",
  galleryF: "/img/room-wood.jpg",
  aboutPortrait: "/img/room-empty.jpg",
};
