// Partner logos, self-hosted under /public/partners so the marquee no longer
// depends on the legacy italiamo.eu/storage (Webglobe) host.
// `boost` darkens light/low-contrast logos so they stay readable on the page.
export type Brand = { name: string; logo: string; boost?: boolean; invert?: boolean };

export const brands: Brand[] = [
  { name: "Vignetti Zanatta",            logo: "/partners/vignetti-zanatta.png", boost: true },
  { name: "Freddi Dolciaria",            logo: "/partners/freddi-dolciaria.png" },
  { name: "La Colomba Bianca",           logo: "/partners/la-colomba-bianca.png" },
  { name: "Latteria Sociale Mantova",    logo: "/partners/latteria-sociale-mantova.png" },
  { name: "Fior di Maso",                logo: "/partners/fior-di-maso.png" },
  { name: "Primitivo",                   logo: "/partners/primitivo.png" },
  { name: "Alce Nero",                   logo: "/partners/alce-nero.jpg" },
  { name: "Arrighi",                     logo: "/partners/arrighi.png" },
  { name: "Caffè Diemme",                logo: "/partners/caffe-diemme.jpg" },
  { name: "Casa Rinaldi",                logo: "/partners/casa-rinaldi.jpg" },
  { name: "Gala",                        logo: "/partners/gala.jpeg" },
  { name: "Gran Riso",                   logo: "/partners/gran-riso.jpg" },
  { name: "Grana Padano",                logo: "/partners/grana-padano.gif" },
  { name: "Grano Armando",               logo: "/partners/grano-armando.webp" },
  { name: "Mechanical Coffee",           logo: "/partners/mechanical-coffee.png" },
  { name: "eKavičkar Prešov",            logo: "/partners/ekavickar.svg" },
  { name: "I Lauri",                     logo: "/partners/i-lauri.png" },
  { name: "La Tordera",                  logo: "/partners/la-tordera.jpg" },
  { name: "Marini",                      logo: "/partners/marini.jpg" },
  { name: "Mazza",                       logo: "/partners/mazza.jpg" },
  { name: "Pasta Baronia",               logo: "/partners/pasta-baronia.jpeg" },
  { name: "Schola Sarmenti",             logo: "/partners/schola-sarmenti.png" },
  { name: "Sterilgarda",                 logo: "/partners/sterilgarda.png" },
  { name: "Tenute Salva Terra",          logo: "/partners/tenute-salva-terra.png" },
  { name: "Villa Mottura",               logo: "/partners/villa-mottura.jpeg" },
  { name: "Fratelli Mantova",            logo: "/partners/fratelli-mantova.svg" },
];
