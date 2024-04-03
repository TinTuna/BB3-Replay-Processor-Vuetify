import { IdRace } from "@/types/IdTypes/IdRace";

type LogoData = {
  name: string;
  logoFileId: string;
};

export type Logo = {
  name: string;
  logoFileId: string;
  logo: string;
  guid: string;
};

export const getLogoFromGuid = (teamRace: IdRace, guid: LogoGuids): Logo => {
  const logo: Logo = {
    name: "",
    logoFileId: "",
    logo: "",
    guid: guid,
  };

  if (logoList[guid]) {
    // If we have a logo for this guid, set the name and logo
    logo.name = logoList[guid].name;
    logo.logo = new URL(
      `../../assets/logos/${logoList[guid].logoFileId}.png`,
      import.meta.url
    ).href;
    logo.logoFileId = logoList[guid].logoFileId;
  } else {
    // If we don't have a logo for this guid, set a default one for the race
    switch (teamRace) {
      case "1":
        // Human
        logo.name = "Imperial Eagle";
        logo.logo = new URL(
          `../../assets/logos/Logo_Human_01.png`,
          import.meta.url
        ).href;
        logo.logoFileId = "Logo_Human_01";
        break;
      case "2":
        // Dwarf
        logo.name = "Guardian of the Mines";
        logo.logo = new URL(
          `../../assets/logos/Logo_Dwarf_08.png`,
          import.meta.url
        ).href;
        logo.logoFileId = "Logo_Dwarf_08";
        break;
      case "3":
        // Skaven
        logo.name = "Blood Bowl Clan";
        logo.logo = new URL(
          `../../assets/logos/Logo_Skaven_01.png`,
          import.meta.url
        ).href;
        logo.logoFileId = "Logo_Skaven_01";
        break;
      case "4":
        // Orc
        logo.name = "Gork & Mork";
        logo.logo = new URL(
          `../../assets/logos/Logo_Orc_01.png`,
          import.meta.url
        ).href;
        logo.logoFileId = "Logo_Orc_01";
        break;
      case "5":
        // Lizardmen
        logo.name = "The Honoured Ball";
        logo.logo = new URL(
          `../../assets/logos/Logo_Neutral_01.png`,
          import.meta.url
        ).href;
        logo.logoFileId = "Logo_Neutral_01";
        break;
      case "7":
        // Wood Elf
        logo.name = "Elven Warrior Mask";
        logo.logo = new URL(
          `../../assets/logos/Logo_ElvenUnion_02.png`,
          import.meta.url
        ).href;
        logo.logoFileId = "Logo_ElvenUnion_02";
        break;
      case "8":
        // Chaos Chosen
        logo.name = "Wheel of Fortune";
        logo.logo = new URL(
          `../../assets/logos/Logo_ChaosChosen_07.png`,
          import.meta.url
        ).href;
        logo.logoFileId = "Logo_ChaosChosen_07";
        break;
      case "9":
        // Dark Elf
        logo.name = "Torn Life";
        logo.logo = new URL(
          `../../assets/logos/Logo_DarkElf_09.png`,
          import.meta.url
        ).href;
        logo.logoFileId = "Logo_DarkElf_09";
        break;
      case "10":
        // Shambling Undead
        logo.name = "Destiny";
        logo.logo = new URL(
          `../../assets/logos/Logo_Neutral_07.png`,
          import.meta.url
        ).href;
        logo.logoFileId = "Logo_Neutral_07";
        break;
      case "14":
        // Elven Union
        logo.name = "Elven Warrior Mask";
        logo.logo = new URL(
          `../../assets/logos/Logo_ElvenUnion_02.png`,
          import.meta.url
        ).href;
        logo.logoFileId = "Logo_ElvenUnion_02";
        break;
      case "18":
        // Nurgle
        logo.name = "Sign of Nurgle";
        logo.logo = new URL(
          `../../assets/logos/Logo_Nurgle_01.png`,
          import.meta.url
        ).href;
        logo.logoFileId = "Logo_Nurgle_01";
        break;
      case "22":
        // Underworld Denizens
        logo.name = "Destiny";
        logo.logo = new URL(
          `../../assets/logos/Logo_Neutral_07.png`,
          import.meta.url
        ).href;
        logo.logoFileId = "Logo_Neutral_07";
        break;
      case "24":
        // Imperial Nobility
        logo.name = "Triumphant Eagle";
        logo.logo = new URL(
          `../../assets/logos/Logo_ImperialNobility_01.png`,
          import.meta.url
        ).href;
        logo.logoFileId = "Logo_ImperialNobility_01";
        break;
      case "1000":
        // Black Orc
        logo.name = "Spiky Ball";
        logo.logo = new URL(
          `../../assets/logos/Logo_BlackOrc_01.png`,
          import.meta.url
        ).href;
        logo.logoFileId = "Logo_BlackOrc_01";
        break;
      case "1001":
        // Chaos Renegades
        logo.name = "Destiny";
        logo.logo = new URL(
          `../../assets/logos/Logo_Neutral_07.png`,
          import.meta.url
        ).href;
        logo.logoFileId = "Logo_Neutral_07";
        break;
      case "1002":
        // Old World Alliance
        logo.name = "Destiny";
        logo.logo = new URL(
          `../../assets/logos/Logo_Neutral_07.png`,
          import.meta.url
        ).href;
        logo.logoFileId = "Logo_Neutral_07";
        break;
      default:
        // Default to the human logo
        logo.name = "Imperial Eagle";
        logo.logo = new URL(
          `../../assets/logos/Logo_Human_01.png`,
          import.meta.url
        ).href;
        logo.logoFileId = "Logo_Human_01";
        break;
    }
  }

  return logo;
};

const logoList: { [key in LogoGuids]: LogoData } = {
  "6793f9e2-f0e1-5800-bb81-2220e8951c20": {
    name: "Spiky Ball",
    logoFileId: "Logo_BlackOrc_01",
  },
  "21c7f970-2e64-5fc9-bbf2-149d14889e39": {
    name: "Brawler",
    logoFileId: "Logo_BlackOrc_02",
  },
  "0366869a-5a0e-530e-b26b-35130ee71ce3": {
    name: "Crusher Skull",
    logoFileId: "Logo_BlackOrc_03",
  },
  "9436eb7c-5e7c-54cd-acdc-7f8396269098": {
    name: "Weapons of Nuffle",
    logoFileId: "Logo_BlackOrc_04",
  },
  "c9fb2c6b-270a-572d-8717-2a79905f3700": {
    name: "Black Look",
    logoFileId: "Logo_BlackOrc_05",
  },
  "368f1723-380c-5c37-9d30-75b22185c4f3": {
    name: "Fist of the Waaagh",
    logoFileId: "Logo_BlackOrc_06",
  },
  "6f55566e-df26-5066-ab1f-3acc28431428": {
    name: "Twisted Face",
    logoFileId: "Logo_BlackOrc_07",
  },
  "e586abfe-1cba-5c14-8e9d-d751e2800828": {
    name: "Cannibal",
    logoFileId: "Logo_BlackOrc_08",
  },
  "304eee85-32b0-5241-8efd-b05eb91ecc91": {
    name: "Pirate Orc",
    logoFileId: "Logo_BlackOrc_09",
  },
  "d9b7a758-b6de-59e0-9e9e-08fe4c9fe4a9": {
    name: "Wheel of Fortune",
    logoFileId: "Logo_ChaosChosen_07",
  },
  "c28473f3-8347-52e8-9479-421f4c544e18": {
    name: "Eight Arrows of Chaos",
    logoFileId: "Logo_ChaosChosen_08",
  },
  "e1ad6af0-c661-5ece-8b9f-6ac76cfc6565": {
    name: "Torn Life",
    logoFileId: "Logo_DarkElf_09",
  },
  "d3956e38-08a3-5279-9154-7e5a9b09069c": {
    name: "Guardian of the Mines",
    logoFileId: "Logo_Dwarf_08",
  },
  "63785fcb-c50b-59e3-8c26-a433bb3a3071": {
    name: "Elven Warrior Mask",
    logoFileId: "Logo_ElvenUnion_02",
  },
  "527fdd80-9adf-50f1-86a3-b0e8b83fd69f": {
    name: "Imperial Eagle",
    logoFileId: "Logo_Human_01",
  },
  "65e0d3da-e281-5bc8-98b0-54848ed166d9": {
    name: "Triumphant Eagle",
    logoFileId: "Logo_ImperialNobility_01",
  },
  "ff74a515-f785-5b80-ae4f-88ce9c7800da": {
    name: "The Honoured Ball",
    logoFileId: "Logo_Neutral_01",
  },
  "2c7eee58-d606-5461-aca6-6816ca83468f": {
    name: "Kris of Damnation",
    logoFileId: "Logo_Neutral_02",
  },
  "59a9c75c-eb59-5598-94fc-92e769c29452": {
    name: "Double-Face Vampire",
    logoFileId: "Logo_Neutral_03",
  },
  "617cd969-0abe-54ef-b48a-3a690bf40d50": {
    name: "Twin Ichor",
    logoFileId: "Logo_Neutral_04",
  },
  "d2b4e2d6-c320-573a-864c-2bb9628fae4f": {
    name: "Demonic Cup",
    logoFileId: "Logo_Neutral_05",
  },
  "b42ff505-27a0-59e5-86e6-d54786729469": {
    name: "Sigmar's Desire",
    logoFileId: "Logo_Neutral_06",
  },
  "f0c68051-a3dd-5177-bb73-eaae0cbd7557": {
    name: "Destiny",
    logoFileId: "Logo_Neutral_07",
  },
  "1b959255-805e-5dc3-a441-7f37df906d50": {
    name: "Gears of Destiny",
    logoFileId: "Logo_Neutral_08",
  },
  "7c7464ea-87ab-542f-ab2c-6321a7ee7159": {
    name: "Firey Ham",
    logoFileId: "Logo_Neutral_09",
  },
  "f7fbf954-78fa-5c3a-9f46-1b885021c694": {
    name: "Metamorphosis of the Losers",
    logoFileId: "Logo_Neutral_10",
  },
  "6caffe30-2183-5635-843c-01f4d79c7b10": {
    name: "Lightning",
    logoFileId: "Logo_Neutral_11",
  },
  "1cbe3574-e0eb-5d2b-a1dc-ef75f8680d03": {
    name: "Front Line",
    logoFileId: "Logo_Neutral_13",
  },
  "2bb0c2c1-2a56-5d42-a7ca-e04183173755": {
    name: "Radiant Hornet",
    logoFileId: "Logo_Neutral_14",
  },
  "bac141c6-db0a-58ce-884b-8af6231058d3": {
    name: "Laughter of the Pirate",
    logoFileId: "Logo_Neutral_15",
  },
  "0db3f872-a1fc-5e65-963c-d44d83a2c9b3": {
    name: "Green Apple",
    logoFileId: "Logo_Neutral_16",
  },
  "c105eebf-9a86-5009-b351-64283c99dc64": {
    name: "Purple Widow",
    logoFileId: "Logo_Neutral_17",
  },
  "78506184-8010-5e98-b2c4-595b2dc48ba8": {
    name: "Stronghold",
    logoFileId: "Logo_Neutral_18",
  },
  "2e14618d-9576-52df-aaea-d62a5c20f948": {
    name: "Duel",
    logoFileId: "Logo_Neutral_19",
  },
  "f024a977-49d1-5fb9-8a37-ac013266d4c8": {
    name: "Fiery Meteor",
    logoFileId: "Logo_Neutral_20",
  },
  "80ee8715-4997-5b3a-8403-2955c2fb5f1f": {
    name: "S",
    logoFileId: "Logo_Neutral_21",
  },
  "8f6dba20-8aa6-52c8-86cb-9f367acf2e15": {
    name: "Champions",
    logoFileId: "Logo_Neutral_22",
  },
  "a758ec5f-4bcc-53e8-9891-98e4e0cad4c4": {
    name: "G",
    logoFileId: "Logo_Neutral_23",
  },
  "64d779c1-be7a-568f-9257-66a03a9680f8": {
    name: "Purple Widow",
    logoFileId: "Logo_Neutral_24",
  },
  "b322fade-df08-5cb3-866b-ac4bfdc0b056": {
    name: "Y",
    logoFileId: "Logo_Neutral_25",
  },
  "10acf00a-a97d-5823-8311-c565579b8aae": {
    name: "T",
    logoFileId: "Logo_Neutral_26",
  },
  "88a0368a-913b-55e6-a580-7451a9f171ed": {
    name: "R",
    logoFileId: "Logo_Neutral_27",
  },
  "f1a4b618-f27e-55d1-9d18-7eea98afd529": {
    name: "U",
    logoFileId: "Logo_Neutral_28",
  },
  "a2869939-9948-5dce-b60f-e5d30d5d01d8": {
    name: "W",
    logoFileId: "Logo_Neutral_29",
  },
  "970bff82-a64e-50e8-a8e6-db63ad113187": {
    name: "V",
    logoFileId: "Logo_Neutral_30",
  },
  "518907af-1ff0-5e2d-8f39-f159f42d7e90": {
    name: "Sign of Nurgle",
    logoFileId: "Logo_Nurgle_01",
  },
  "dc8b8bf2-ec85-5531-ba55-a572511c9b2a": {
    name: "Gork & Mork",
    logoFileId: "Logo_Orc_01",
  },
  "e74d24fc-2e0e-5334-9bed-4fd36d519591": {
    name: "Mangled Ball",
    logoFileId: "Logo_Orc_02",
  },
  "0ad6e1c5-4a61-5290-a194-4b0bd99ef82c": {
    name: "Grimacing Moon",
    logoFileId: "Logo_Orc_12",
  },
  "cbd35bd1-f664-5187-ba11-fb163ca189ab": {
    name: "Blood Bowl Clan",
    logoFileId: "Logo_Skaven_01",
  },
  "612c63fd-8b6d-53fa-a290-5a2e5ccb5957": {
    name: "Checkered Orc",
    logoFileId: "Logo_BlackOrc_10",
  },
  "270c4253-c8eb-552e-8984-af1f4649ce83": {
    name: "Ceremonial Necklace",
    logoFileId: "Logo_BlackOrc_11",
  },
  "f1ee02ae-a61b-5e7a-bb1c-449f5b40ef91": {
    name: "Savage Orc",
    logoFileId: "Logo_BlackOrc_12",
  },
  "51ef5139-a599-57b4-aab3-92d2442c9834": {
    name: "Horned Headdress",
    logoFileId: "Logo_BlackOrc_13",
  },
  "30d0dbf8-2f39-556f-bade-6e5f2509727b": {
    name: "Gork's Moon",
    logoFileId: "Logo_BlackOrc_14",
  },
  "42b2552b-b07f-5940-819f-9eebd08c9535": {
    name: "Brutal Orc",
    logoFileId: "Logo_BlackOrc_25",
  },
  "b639aa82-e857-542f-b26e-88208c3d63ca": {
    name: "Bugman's Brewery",
    logoFileId: "Logo_Campaign_Bugman_Beer",
  },
  "af322180-90bf-5f41-b4f0-dfaffb2b8126": {
    name: "Nurgle King",
    logoFileId: "Logo_Campaign_Nurgle_King",
  },
  "d1cbf84b-eedc-5168-94f6-e1540176e01d": {
    name: "Star of Nuln",
    logoFileId: "Logo_ImperialNobility_02",
  },
  "35b585b1-8ca3-5b78-bfec-7046e894f6a1": {
    name: "Noble Halberd",
    logoFileId: "Logo_ImperialNobility_03",
  },
  "d958bf9a-b4b9-5073-b325-da77dc4132cc": {
    name: "Cup and Badge",
    logoFileId: "Logo_ImperialNobility_04",
  },
};

export type LogoGuids =
  | "6793f9e2-f0e1-5800-bb81-2220e8951c20"
  | "21c7f970-2e64-5fc9-bbf2-149d14889e39"
  | "0366869a-5a0e-530e-b26b-35130ee71ce3"
  | "9436eb7c-5e7c-54cd-acdc-7f8396269098"
  | "c9fb2c6b-270a-572d-8717-2a79905f3700"
  | "368f1723-380c-5c37-9d30-75b22185c4f3"
  | "6f55566e-df26-5066-ab1f-3acc28431428"
  | "e586abfe-1cba-5c14-8e9d-d751e2800828"
  | "304eee85-32b0-5241-8efd-b05eb91ecc91"
  | "d9b7a758-b6de-59e0-9e9e-08fe4c9fe4a9"
  | "c28473f3-8347-52e8-9479-421f4c544e18"
  | "e1ad6af0-c661-5ece-8b9f-6ac76cfc6565"
  | "d3956e38-08a3-5279-9154-7e5a9b09069c"
  | "63785fcb-c50b-59e3-8c26-a433bb3a3071"
  | "527fdd80-9adf-50f1-86a3-b0e8b83fd69f"
  | "65e0d3da-e281-5bc8-98b0-54848ed166d9"
  | "ff74a515-f785-5b80-ae4f-88ce9c7800da"
  | "2c7eee58-d606-5461-aca6-6816ca83468f"
  | "59a9c75c-eb59-5598-94fc-92e769c29452"
  | "617cd969-0abe-54ef-b48a-3a690bf40d50"
  | "d2b4e2d6-c320-573a-864c-2bb9628fae4f"
  | "b42ff505-27a0-59e5-86e6-d54786729469"
  | "f0c68051-a3dd-5177-bb73-eaae0cbd7557"
  | "1b959255-805e-5dc3-a441-7f37df906d50"
  | "7c7464ea-87ab-542f-ab2c-6321a7ee7159"
  | "f7fbf954-78fa-5c3a-9f46-1b885021c694"
  | "6caffe30-2183-5635-843c-01f4d79c7b10"
  | "1cbe3574-e0eb-5d2b-a1dc-ef75f8680d03"
  | "2bb0c2c1-2a56-5d42-a7ca-e04183173755"
  | "bac141c6-db0a-58ce-884b-8af6231058d3"
  | "0db3f872-a1fc-5e65-963c-d44d83a2c9b3"
  | "c105eebf-9a86-5009-b351-64283c99dc64"
  | "78506184-8010-5e98-b2c4-595b2dc48ba8"
  | "2e14618d-9576-52df-aaea-d62a5c20f948"
  | "f024a977-49d1-5fb9-8a37-ac013266d4c8"
  | "80ee8715-4997-5b3a-8403-2955c2fb5f1f"
  | "8f6dba20-8aa6-52c8-86cb-9f367acf2e15"
  | "a758ec5f-4bcc-53e8-9891-98e4e0cad4c4"
  | "64d779c1-be7a-568f-9257-66a03a9680f8"
  | "b322fade-df08-5cb3-866b-ac4bfdc0b056"
  | "10acf00a-a97d-5823-8311-c565579b8aae"
  | "88a0368a-913b-55e6-a580-7451a9f171ed"
  | "f1a4b618-f27e-55d1-9d18-7eea98afd529"
  | "a2869939-9948-5dce-b60f-e5d30d5d01d8"
  | "970bff82-a64e-50e8-a8e6-db63ad113187"
  | "518907af-1ff0-5e2d-8f39-f159f42d7e90"
  | "dc8b8bf2-ec85-5531-ba55-a572511c9b2a"
  | "e74d24fc-2e0e-5334-9bed-4fd36d519591"
  | "0ad6e1c5-4a61-5290-a194-4b0bd99ef82c"
  | "cbd35bd1-f664-5187-ba11-fb163ca189ab"
  | "612c63fd-8b6d-53fa-a290-5a2e5ccb5957"
  | "270c4253-c8eb-552e-8984-af1f4649ce83"
  | "f1ee02ae-a61b-5e7a-bb1c-449f5b40ef91"
  | "51ef5139-a599-57b4-aab3-92d2442c9834"
  | "30d0dbf8-2f39-556f-bade-6e5f2509727b"
  | "42b2552b-b07f-5940-819f-9eebd08c9535"
  | "b639aa82-e857-542f-b26e-88208c3d63ca"
  | "af322180-90bf-5f41-b4f0-dfaffb2b8126"
  | "d1cbf84b-eedc-5168-94f6-e1540176e01d"
  | "35b585b1-8ca3-5b78-bfec-7046e894f6a1"
  | "d958bf9a-b4b9-5073-b325-da77dc4132cc";