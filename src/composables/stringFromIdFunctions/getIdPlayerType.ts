import { PlayerIdType } from '@/types/IdTypes/PlayerIdTypes';

export const getIdPlayerType = (IdPlayerType: PlayerIdType): string => {
    if (IdPlayerTypes[IdPlayerType]) return IdPlayerTypes[IdPlayerType];
    console.warn(`Unknown IdPlayerType: ${IdPlayerType}`);
    return `Unknown: ${IdPlayerType}`;
}

const IdPlayerTypes = {
    "1070": "Lineman",
    "1064": "Old World Alliance / Unknown",
    "1071": "Old World Alliance / Unknown",
    "1072": "Old World Alliance / Unknown",
    "1073": "Undead / Unknown",
    "1074": "Mummy",
    "1076": "Undead / Unknown",
    "1077": "Undead / Unknown",
}