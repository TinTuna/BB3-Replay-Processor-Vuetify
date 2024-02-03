import { IdRace } from "@/types/IdTypes/IdRace";

export const getIdTeamRace = (idTeamRace: IdRace): string => {
  if (idTeamRaces[idTeamRace]) return idTeamRaces[idTeamRace];
  console.warn(`Unknown idTeamRace: ${idTeamRace}`);
  return `Unknown: ${idTeamRace}`;
};

const idTeamRaces = {
  "10": "Undead",
  "1002": "Old World Alliance",
};
