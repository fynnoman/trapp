export const SITE = {
  name: "GDH Christoph Trapp",
  nameLong: "Fa. GDH Christoph Trapp · Stuckateurmeisterbetrieb",
  short: "GDH",
  claim: "Qualität, die bleibt.",
  inhaber: "Christoph Trapp",
  city: "Bous",
  region: "Saarland",
  street: "Traminerweg 4",
  zip: "66359",
  displayStreet: "Traminerweg 4",
  displayZip: "66359",
  displayCity: "Bous",
  phoneDisplay: "0177 361 63 58",
  phoneHref: "+4917736163558",
  email: "info@gipser-der-herzen.de",
  hours: "Montag bis Freitag, 07:30 bis 18:00",
  ustid: "DE452632565",
  foundedYear: 2018,
  masterExperienceSince: 1997,
  pillars: ["Qualität", "Vertrauen", "Beständigkeit"] as const,
  logo: {
    src: "/img/logo-gdh-gold.png",
    width: 1916,
    height: 821,
    alt: "GDH Christoph Trapp · Stuckateurmeisterbetrieb",
  },
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
    lede: "Oberflächen mit Bestand.",
    body:
      "Vom Grundputz über Reibeputz bis zur fein geriebenen Oberfläche. Innen glatt für klassische Räume, außen robust gegen Wetter und Zeit.",
    tags: ["Reibeputz", "Glättputz", "Fassadenputz", "Dekorputz"],
    tone: "stone",
    image: "/img/renovation-sunlight.jpg",
    focal: "center",
  },
  {
    slug: "trockenbau",
    title: "Trockenbau",
    lede: "Räume, präzise gefügt.",
    body:
      "Wände, Vorsatzschalen, abgehängte Decken, Dachschrägen. Sauber abgeklebt, exakt gespachtelt, bereit für Farbe oder Tapete.",
    tags: ["Ständerwände", "Decken", "Schallschutz", "Dachausbau"],
    tone: "ink",
    image: "/img/ceiling-rosette-cove.jpg",
  },
  {
    slug: "spanndecken",
    title: "Spanndecken",
    lede: "Decke neu, ohne lange Baustelle.",
    body:
      "Textilspanndecken in Matt, Satin oder Akustik. Werkseitig zugeschnitten, vor Ort gespannt. Keine Risse, keine lange Trocknung.",
    tags: ["Akustik", "Lichtdecken", "Renovierung"],
    tone: "stone",
    image: "/img/ceiling-led-recessed.jpg",
  },
  {
    slug: "maler",
    title: "Malerarbeiten",
    lede: "Farbe mit System.",
    body:
      "Innenanstriche, Lasuren, Lackarbeiten an Türen und Rahmen, Außenanstriche. Beratung zu Farbton, Deckkraft und Material.",
    tags: ["Innenanstrich", "Lasur", "Lack", "Fassade"],
    tone: "clay",
    image: "/img/hallway-sconces.jpg",
  },
  {
    slug: "boeden",
    title: "Bodenbeläge",
    lede: "Grundiert, gespachtelt, verlegt.",
    body:
      "Vorbereitung, Spachtelung und Verlegung von Vinyl, Designböden und textilen Belägen. Für Wohnräume, Praxen und Büros.",
    tags: ["Design", "Vinyl", "Textil", "Spachtelung"],
    tone: "ink",
    image: "/img/altbau-parquet.jpg",
  },
  {
    slug: "geruest",
    title: "Gerüstbau",
    lede: "Sicher nach oben.",
    body:
      "Arbeits- und Fassadengerüste für die eigenen Baustellen. Standsicher aufgebaut, mit Rücksicht auf Nachbarschaft und Logistik.",
    tags: ["Fassadengerüst", "Arbeitsgerüst", "Absicherung"],
    tone: "clay",
    image: "/img/villa-exterior.jpg",
  },
];

export const IMG = {
  hero: "/img/hero-living-room.jpg",
  heroAccent: "/img/living-room-arch.jpg",
  statement: "/img/console-warm-mediterranean.jpg",
  galleryA: "/img/renovation-sunlight.jpg",
  galleryB: "/img/ceiling-led-recessed.jpg",
  galleryC: "/img/spa-bathroom.jpg",
  galleryD: "/img/living-room-arch.jpg",
  galleryE: "/img/villa-exterior.jpg",
  galleryF: "/img/altbau-parquet.jpg",
  aboutPortrait: "/img/craftsman-stucco.jpg",
};
