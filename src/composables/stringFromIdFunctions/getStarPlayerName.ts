export const getStarPlayerName = (starPlayerId: keyof typeof starPlayerNames): string | undefined => {
    if (starPlayerNames[starPlayerId]) return starPlayerNames[starPlayerId];
    console.warn(`Unknown StarPlayerId: ${starPlayerId}`);
    return undefined;
}

const starPlayerNames = {
    "1112": "Gobbler Grimlich",
    "1113": "Griff Oberwald",
    "1114": "Karla Von Kill",
    "1115": "Lord Borak The Despoiler",
    "1116": "Roxanna Darknail",
    "1117": "Varag Ghoul-Chewer",
    "1118": "Grombrindal, the White Dwarf",
    "1119": "Morg ‘n’ Thorg",
    "1121": "Helmut Wolf",
    "1122": "Willow Rosebark",
    "1124": "Hakflem Skuttlespike",
    "1125": "Eldril Sidewinder",
    "1126": "Grim Ironjaw",
    "1127": "Mighty Zug",
    "1129": "Ripper Bolgrot",
    "1130": "Barik Farblast",
    "1131": "Withergrasp Doubledrool",
    "1134": "Kiroth Krakeneye",
    "1136": "Asperon Thorn",
    "1137": "Horkon Heartripper",
    "1138": "Ivan 'The Animal' Deathshroud",
    "1139": "Curnoth Darkwold",
    "1141": "Jordell Freshbreeze",
    "1142": "Anqi Panqi",
    "1143": "Glotl Stop",
    "1445": "Bilerot Vomitflesh",
    "1450": "Gloriel Summerbloom",
    "1453": "Bryce 'The Slice' Cambuel"
}