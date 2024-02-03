import { PlayerIdType } from '@/types/IdTypes/PlayerIdTypes';

export const getIdPlayerType = (IdPlayerType: PlayerIdType): string => {
    if (IdPlayerTypes[IdPlayerType]) return IdPlayerTypes[IdPlayerType];
    console.warn(`Unknown IdPlayerType: ${IdPlayerType}`);
    return `Unknown: ${IdPlayerType}`;
}

const IdPlayerTypes = {
    // OWA
    "1070": "Human Lineman",
    "1064": "Dwarf Blocker",
    "1071": "1071",
    "1072": "Ogre",
    // Undead
    "1073": "Goul Runner",
    "1074": "Mummy",
    "1076": "Wight Blitzer",
    "1077": "Zombie Lineman", 
}