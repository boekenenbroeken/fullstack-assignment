export type Champion = {
  season: string;
  driver: { id: string; name: string; nationality: string };
  team: { id: string; name: string };
};

export type Race = {
  id: number;
  name: string;
  date: string;
  round: string;
  circuitName: string;
  winner: { id: string; name: string; nationality: string };
  team: { id: string; name: string };
};
