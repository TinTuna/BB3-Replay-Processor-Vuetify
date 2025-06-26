import { PlayerIdType } from '@/types/IdTypes/PlayerIdTypes';

export const getIdPlayerType = (IdPlayerType: PlayerIdType): string => {
    if (IdPlayerTypes[IdPlayerType]) return IdPlayerTypes[IdPlayerType];
    console.warn(`Unknown IdPlayerType: ${IdPlayerType}`);
    return `Unknown Type ${IdPlayerType}`;
}

const IdPlayerTypes = {
    // // Human
    "1": "Lineman",
    "2": "Catcher",
    "3": "Thrower",
    "4": "Blitzer",
    "5": "Ogre",
    "1019": "Halfling Hopeful",

    // // Dwarf
    "6": "Blocker Lineman",
    "7": "Runner",
    "8": "Blitzer",
    "9": "Troll Slayer",
    "10": "Deathroller",

    // // Orc
    "21": "Lineman",
    "22": "Goblin",
    "23": "Thrower",
    "24": "Big 'Un Blocker",
    "25": "Blitzer",
    "26": "Untrained Troll",

    // // Chaos Chosen
    "32": "Beastman Lineman",
    "33": "Chosen Blocker",
    "34": "Minotaur",
    "1103": "Chaos Troll",
    "1104": "Chaos Ogre",

    // // Dark Elf
    "47": "Lineman",
    "48": "Runner",
    "49": "Assassin",
    "50": "Blitzer",
    "51": "Witch Elf",

    // // Elven Union
    "73": "Thrower",
    "75": "Blitzer",
    "77": "Lineman",
    "79": "Catcher",

    // // Chaos Renegades
    "1006": "Dark Elf",
    "1007": "Goblin",
    "1008": "Human Lineman",
    "1009": "Human Thrower",
    "1010": "Minotaur",
    "1011": "Ogre",
    "1012": "Orc",
    "1013": "Skaven",
    "1014": "Troll",
    "1106": "Rat Ogre",

    // // Imperial Nobility
    "1020": "Retainer Lineman",
    "1021": "Thrower",
    "1022": "Noble Blitzer",
    "1023": "Bodyguard",
    "1024": "Ogre",

    // // Lizardmen
    "1029": "Skink Runner",
    "1030": "Chameleon Skink",
    "1031": "Saurus Blocker",
    "1032": "Kroxigor",

    // // Underworld Denizens
    "1090": "Goblin Lineman",
    "1092": "Gutter Runner",
    "1091": "Skaven Blitzer",
    "1093": "Skaven Clanrat",
    "1094": "Skaven Thrower",
    "1095": "Troll",
    "1107": "Mutant Rat Ogre",
    "1108": "Snotling",

    // // Nurgle
    "1056": "Pestigor",
    "1057": "Bloater",
    "1058": "Rotspawn",
    "1059": "Rotter Lineman",

    // // Black Orc
    "1000": "Black Orc",
    "1001": "Goblin Lineman",
    "1002": "Trained Troll",

    // // Skaven
    "1078": "Rat Ogre",
    "1079": "Blitzer",
    "1080": "Gutter Runner",
    "1081": "Lineman",
    "1082": "Thrower",

    // // Old World Alliance
    "1063": "Dwarf Blitzer",
    "1064": "Dwarf Blocker",
    "1065": "Dwarf Runner",
    "1066": "Dwarf Troll Slayer",
    "1067": "Halfling Hopeful",
    "1068": "Human Blitzer",
    "1069": "Human Catcher",
    "1070": "Human Lineman",
    "1071": "Human Thrower",
    "1072": "Ogre",
    "1105": "Forest Treeman",

    // // Shambling Undead
    "1073": "Ghoul Runner",
    "1074": "Mummy",
    "1075": "Skeleton Lineman",
    "1076": "Wight Blitzer",
    "1077": "Zombie Lineman",

    // // Wood Elves
    "1098": "Loren Forest Treeman",
    "1099": "Catcher",
    "1100": "Lineman",
    "1101": "Thrower",
    "1102": "Wardancer",



    // // Star Players
    "1112": "Star Player",
    "1113": "Star Player",
    "1114": "Star Player",
    "1115": "Star Player",
    "1116": "Star Player",
    "1117": "Star Player",
    "1118": "Star Player",
    "1119": "Star Player",
    "1120": "Star Player",
    "1121": "Star Player",
    "1122": "Star Player",
    "1123": "Star Player",
    "1124": "Star Player",
    "1125": "Star Player",
    "1126": "Star Player",
    "1127": "Star Player",
    "1128": "Star Player",
    "1129": "Star Player",
    "1130": "Star Player",
    "1131": "Star Player",
    "1132": "Star Player",
    "1133": "Star Player",
    "1134": "Star Player",
    "1135": "Star Player",
    "1136": "Star Player",
    "1137": "Star Player",
    "1138": "Star Player",
    "1139": "Star Player",
    "1140": "Star Player",
    "1141": "Star Player",
    "1142": "Star Player",
    "1143": "Star Player",
    "1445": "Star Player",
    "1450": "Star Player",
    "1453": "Star Player"
}

// Export known player type IDs for comparison
export const knownPlayerIds = new Set(Object.keys(IdPlayerTypes));