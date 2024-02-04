import { PlayerIdType } from '@/types/IdTypes/PlayerIdTypes';

export const getIdPlayerType = (IdPlayerType: PlayerIdType): string => {
    if (IdPlayerTypes[IdPlayerType]) return IdPlayerTypes[IdPlayerType];
    console.warn(`Unknown IdPlayerType: ${IdPlayerType}`);
    return `Unknown: ${IdPlayerType}`;
}

const IdPlayerTypes = {
    // // Human
    "1": "Human Lineman",
    "2": "Catcher",
    "3": "Thrower",
    "4": "Blitzer",
    "5": "Ogre",
    // // Dwarf
    "6": "Blocker Lineman",
    // "7": "",
    // "8": "",
    // "9": "",
    "10": "Deathroller",
    // // Elven Union
    "73": "Thrower",
    "75": "Blitzer",
    "77": "Lineman",
    "79": "Catcher",
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
    // // OWA
    "1070": "Human Lineman",
    "1064": "Dwarf Blocker",
    "1071": "1071",
    "1072": "Ogre",
    // // Shambling Undead
    "1073": "Ghoul Runner",
    "1074": "Mummy",
    "1075": "Skeleton Lineman",
    "1076": "Wight Blitzer",
    "1077": "Zombie Lineman",
}