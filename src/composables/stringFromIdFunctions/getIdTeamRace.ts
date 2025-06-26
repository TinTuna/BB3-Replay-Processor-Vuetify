export const idTeamRaces = {
  "1": "Human",
  "2": "Dwarf",
  "3": "Skaven",
  "4": "Orc",
  "5": "Lizardmen",
  "7": "Wood Elf",
  "8": "Chaos Chosen",
  "9": "Dark Elf",
  "10": "Shambling Undead",
  "14": "Elven Union",
  "18": "Nurgle",
  "22": "Underworld Denizens",
  "24": "Imperial Nobility",
  "1000": "Black Orc",
  "1001": "Chaos Renegades",
  "1002": "Old World Alliance",
} as const;

// Derive the IdRace type from the keys of idTeamRaces
export type IdRace = keyof typeof idTeamRaces;

export const getIdTeamRace = (idTeamRace: IdRace): string | undefined => {
  if (idTeamRaces[idTeamRace]) return idTeamRaces[idTeamRace];
  console.warn(`Unknown idTeamRace: ${idTeamRace}`);
  return;
};

// Export known team race IDs for comparison
export const knownTeamIds = new Set(Object.keys(idTeamRaces));
