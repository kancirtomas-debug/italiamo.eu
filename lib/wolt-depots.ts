export type WoltDepot = {
  id: string;
  city: string;
  district: string;
  address: string;
  url: string;
};

export const WOLT_DEPOTS: WoltDepot[] = [
  {
    id: "kosice",
    city: "Košice",
    district: "Centrum",
    address: "Košice",
    url: "https://wolt.com/sk/svk/kosice",
  },
  {
    id: "ba-stare-mesto",
    city: "Bratislava",
    district: "Staré Mesto",
    address: "Ferienčíková 11",
    url: "https://wolt.com/sk/svk/bratislava",
  },
  {
    id: "ba-nove-mesto",
    city: "Bratislava",
    district: "Nové Mesto",
    address: "Pionierska 17",
    url: "https://wolt.com/sk/svk/bratislava",
  },
  {
    id: "ba-petrzalka",
    city: "Bratislava",
    district: "Petržalka",
    address: "Wolt Market, Gogoľova 18A",
    url: "https://wolt.com/sk/svk/bratislava/venue/wolt-market-petrzalka",
  },
];
