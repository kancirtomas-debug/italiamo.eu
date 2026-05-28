// Real partner logos sourced from https://italiamo.eu/#partners (storage CDN).
// `boost` darkens light/low-contrast logos so they stay readable on the page.
export type Brand = { name: string; logo: string; boost?: boolean; invert?: boolean };

const STORAGE = "https://italiamo.eu/storage/partners";

export const brands: Brand[] = [
  { name: "Vignetti Zanatta",            logo: `${STORAGE}/December2020/BIcP0aIdMT8Ig78JGsQW.png`, boost: true },
  { name: "Freddi Dolciaria",            logo: `${STORAGE}/December2020/irTo3GzHKIHRwcgQCXt6.png` },
  { name: "La Colomba Bianca",           logo: `${STORAGE}/December2020/Xuj9LLX5UIbDTygmutSP.png` },
  { name: "Latteria Sociale Mantova",    logo: `${STORAGE}/December2020/Wnw77eg1cfJg8Z68Cxe5.png` },
  { name: "Fior di Maso",                logo: `${STORAGE}/December2020/NFmcWzoGy1u9az5QkLCS.png` },
  { name: "Primitivo",                   logo: `${STORAGE}/March2020/jnyP6uEalEpVULgg7Cqj.png` },
  { name: "Tatra Gastro Group",          logo: `${STORAGE}/March2020/JyZQWhPN5cA3KraMHQ1h.png` },
  { name: "Alce Nero",                   logo: `${STORAGE}/March2020/GXFS0EOH1HY43Aqw3Dkf.jpg` },
  { name: "Arrighi",                     logo: `${STORAGE}/March2020/e9gw5O9ai0FApGD0qhvb.png` },
  { name: "Aulus",                       logo: `${STORAGE}/March2020/ET973r3rp0VdgnZlQjoz.jpg` },
  { name: "Caffè Diemme",                logo: `${STORAGE}/March2020/VaFbx3qPTOUfoG7QpM2S.jpg` },
  { name: "Cantina Valdobbiadene",       logo: `${STORAGE}/March2020/DbT40HmSMmJWorQGVCwB.jpg` },
  { name: "Casa Rinaldi",                logo: `${STORAGE}/March2020/5bkzPv4RPMchRe00rC5B.jpg` },
  { name: "Casina Reale",                logo: `${STORAGE}/March2020/7Y5LSuuD65Zms6VHcxvS.jpg` },
  { name: "Cavallino Wine",              logo: `${STORAGE}/March2020/1pFbyCU0aqhMn5ydsgJ6.jpg` },
  { name: "Colesel",                     logo: `${STORAGE}/March2020/laHkXCVeCURRIC9aOFZ3.jpg` },
  { name: "Fiordelisi",                  logo: `${STORAGE}/March2020/Ef4VeugFswiq0ypgTMUS.jpg` },
  { name: "Freddi Dolciaria",            logo: `${STORAGE}/March2020/mv1tRIkK39gLiIEqad14.jpg` },
  { name: "Gala",                        logo: `${STORAGE}/March2020/T3qORco5T8aU6vcmrAOk.jpeg` },
  { name: "Gran Riso",                   logo: `${STORAGE}/March2020/3fDWjt1M3v8vZC5bhqut.jpg` },
  { name: "Grana Padano",                logo: `${STORAGE}/March2020/6en2yhPfy15LqfUkHQUc.gif` },
  { name: "I Lauri",                     logo: `${STORAGE}/March2020/HvgUP8OOmDioFq9BhAd3.png` },
  { name: "La Tordera",                  logo: `${STORAGE}/March2020/tmrAaPTWMbpumAh11Jtn.jpg` },
  { name: "Limmi",                       logo: `${STORAGE}/March2020/BmV5QP3RCEmxAVHuBwI4.png` },
  { name: "Marini",                      logo: `${STORAGE}/March2020/CqGWwQpbk57cxtM1i2Et.jpg` },
  { name: "Mazza",                       logo: `${STORAGE}/March2020/rlRdNrCbMJEGJjJzp1Zd.jpg` },
  { name: "Pasta Baronia",               logo: `${STORAGE}/March2020/ZxcNlMziCcXYKdV8SPLP.jpeg` },
  { name: "Pasta Donna Vera",            logo: `${STORAGE}/March2020/wj18kPKDUG63GH4fB8SE.png` },
  { name: "Pasta Montegrappa",           logo: `${STORAGE}/March2020/PCO4uP8JSlTUl0iJBIpX.jpg` },
  { name: "Schola Sarmenti",             logo: `${STORAGE}/March2020/ZCxvamN1299PKDjtSMMV.png` },
  { name: "Sterilgarda",                 logo: `${STORAGE}/March2020/SGRQwkdLGx2j95OC64qF.png` },
  { name: "Tenute Salva Terra",          logo: `${STORAGE}/March2020/jzuPbsugfhmNz9zFS3Ho.png` },
  { name: "Villa Mottura",               logo: `${STORAGE}/March2020/YwrgtP2FBvtGKsNB4jLQ.jpeg` },
];
