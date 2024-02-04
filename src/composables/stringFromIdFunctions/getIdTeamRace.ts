import { IdRace } from "@/types/IdTypes/IdRace";

export const getIdTeamRace = (idTeamRace: IdRace): string => {
  if (idTeamRaces[idTeamRace]) return idTeamRaces[idTeamRace];
  console.warn(`Unknown idTeamRace: ${idTeamRace}`);
  return `Unknown: ${idTeamRace}`;
};

const idTeamRaces = {
  "1": "Human",
  "2": "Dwarf",
  "3": "Skaven",
  // "4": "",
  // "5": "",
  // "6": "",
  // "7": "",
  // "8": "",
  // "9": "",
  "10": "Shambling Undead",
  // "11": "",
  // "12": "",
  // "13": "",
  "14": "Elven Union",
  "1000": "Black Orc",
  "1002": "Old World Alliance",
};
