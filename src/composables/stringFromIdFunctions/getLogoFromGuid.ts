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
        logo.name = "The Honoured Ball";
        logo.logo = new URL(
          `../../assets/logos/Logo_Neutral_01.png`,
          import.meta.url
        ).href;
        logo.logoFileId = "Logo_Neutral_01";
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
        logo.name = "The Honoured Ball";
        logo.logo = new URL(
          `../../assets/logos/Logo_Neutral_01.png`,
          import.meta.url
        ).href;
        logo.logoFileId = "Logo_Neutral_01";
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
        logo.name = "The Honoured Ball";
        logo.logo = new URL(
          `../../assets/logos/Logo_Neutral_01.png`,
          import.meta.url
        ).href;
        logo.logoFileId = "Logo_Neutral_01";
        break;
      case "1002":
        // Old World Alliance
        logo.name = "The Honoured Ball";
        logo.logo = new URL(
          `../../assets/logos/Logo_Neutral_01.png`,
          import.meta.url
        ).href;
        logo.logoFileId = "Logo_Neutral_01";
        break;
      default:
        // Default to the neutral logo
        logo.name = "The Honoured Ball";
        logo.logo = new URL(
          `../../assets/logos/Logo_Human_01.png`,
          import.meta.url
        ).href;
        logo.logoFileId = "Logo_Neutral_01";
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
  "9df0c6c0-e4a5-500a-b1d2-68c8ab5cb8d9": {
    name: "Sigmar Wings",
    logoFileId: "Logo_ImperialNobility_05",
  },
  "bddb85ec-9aae-59f7-840c-1f286795c088": {
    name: "Joyful Eagle",
    logoFileId: "Logo_ImperialNobility_06",
  },
  "21d3f82d-9e19-58fc-a448-8de5eeb023d6": {
    name: "Reiksguard",
    logoFileId: "Logo_ImperialNobility_07",
  },
  "515a8429-1bed-54c5-96c9-3b18e4529938": {
    name: "Simple Cross",
    logoFileId: "Logo_ImperialNobility_08",
  },
  "af143149-35fe-55fa-84d6-00476aad4667": {
    name: "Glaives",
    logoFileId: "Logo_ImperialNobility_09",
  },
  "ebf7d7cb-1b8b-561e-9348-95090ccc9a53": {
    name: "Imperial Announcement",
    logoFileId: "Logo_ImperialNobility_10",
  },
  "f237e8d0-fb76-564e-b854-15a00c6d4469": {
    name: "Impetuous Unicorn",
    logoFileId: "Logo_ImperialNobility_11",
  },
  "26a095f3-1c66-5841-9be5-052aaadbdac0": {
    name: "Scroll",
    logoFileId: "Logo_ImperialNobility_12",
  },
  "de3e807c-c033-528d-9b0d-f04d3155cd5b": {
    name: "Heraldric Cross",
    logoFileId: "Logo_ImperialNobility_13",
  },
  "afdda955-5844-5579-9197-271c0e1d1f92": {
    name: "Brutal Comet",
    logoFileId: "Logo_ImperialNobility_24",
  },
  "b3bb6cbd-7e9f-5110-bc56-3800657d8495": {
    name: "Brutal Skull",
    logoFileId: "Logo_Neutral_31",
  },
  "77edafff-7433-5d59-b0ab-074a82472ad9": {
    name: "Black Skulls",
    logoFileId: "Logo_Orc_03",
  },
  "e3699cc5-f117-5815-a089-104aaf6ff4d9": {
    name: "Dazzlers",
    logoFileId: "Logo_Orc_04",
  },
  "b468c199-88b2-5dcb-8429-d93ce0c0cd46": {
    name: "Orc Dawn",
    logoFileId: "Logo_Orc_05",
  },
  "1a89880f-5f6a-5de9-aa56-c94d716fde63": {
    name: "M'Orckery",
    logoFileId: "Logo_Orc_06",
  },
  "090270e5-2e65-503a-b6c7-ecf777f8ec6c": {
    name: "Fang of Royal Gold",
    logoFileId: "Logo_Orc_07",
  },
  "b81ff481-2297-553c-b437-4282d78db9c2": {
    name: "Blood-Covered Orc",
    logoFileId: "Logo_Orc_08",
  },
  "19542c1d-cbb9-5b64-bc6d-73ecc602ee04": {
    name: "Orc Footmark",
    logoFileId: "Logo_Orc_09",
  },
  "23667032-8170-552d-a554-6763d5419721": {
    name: "Declaration of War",
    logoFileId: "Logo_Orc_10",
  },
  "8e10d403-bcee-5bae-8baf-db6fbbdaca9f": {
    name: "Orc Shield",
    logoFileId: "Logo_Orc_11",
  },
  "a508b6d8-f231-578d-b5ad-a77f897596b1": {
    name: "Purple Eagle",
    logoFileId: "Logo_Human_02",
  },
  "88c7eba8-db57-505c-8313-c6876a5581ca": {
    name: "Crowned Death",
    logoFileId: "Logo_Human_03",
  },
  "1b7e39f4-6606-59a8-967d-d60839d46409": {
    name: "Roaring Inferno",
    logoFileId: "Logo_Human_04",
  },
  "54522410-ce9c-5927-bddb-ce713e91dcb9": {
    name: "Solar Wrath",
    logoFileId: "Logo_Human_05",
  },
  "dbfea705-5f24-55a3-81ef-19e71980908c": {
    name: "Purple Bull",
    logoFileId: "Logo_Human_06",
  },
  "73341770-3e5d-5128-8424-5bb07843da88": {
    name: "Leonine Shield",
    logoFileId: "Logo_Human_07",
  },
  "3b1285a6-db55-5bf4-b3b7-9d7d5df92a63": {
    name: "Death or Victory",
    logoFileId: "Logo_Human_08",
  },
  "7ca793eb-2345-5820-ad2e-b8ab7d820ecf": {
    name: "Ghal-Maraz",
    logoFileId: "Logo_Human_09",
  },
  "f255dce9-6f98-561a-a46c-182b5ea7d018": {
    name: "Trout",
    logoFileId: "Logo_Human_10",
  },
  "b0985b2d-5b5d-5231-a1f2-c7828d7eaf77": {
    name: "Sextant of Nuffle",
    logoFileId: "Logo_Human_11",
  },
  "aac3afa8-2dea-5827-a7e0-7afef1a24a0e": {
    name: "Cross of Carroburg",
    logoFileId: "Logo_Human_12",
  },
  "9ffe0fe6-95a2-597d-9842-571e560a3002": {
    name: "Imperatoria Draco",
    logoFileId: "Logo_Human_13",
  },
  "25c0a3f2-3d51-5bf4-8ddc-e96959ba0b01": {
    name: "Imperial Artillery",
    logoFileId: "Logo_Human_14",
  },
  "24247713-a8d0-5ed9-bfa9-62340e56d803": {
    name: "Augur-Knight",
    logoFileId: "Logo_Human_15",
  },
  "025acb16-077d-5e5b-a9b4-5ecda9a1f088": {
    name: "White-Lion",
    logoFileId: "Logo_Human_16",
  },
  "137664d3-a361-5afa-8d26-46f9e75012a8": {
    name: "Pirates of the Empire",
    logoFileId: "Logo_Human_17",
  },
  "48b109a5-c7aa-5c8e-b63c-cf1ec19191d6": {
    name: "Phoenix",
    logoFileId: "Logo_Human_18",
  },
  "794fd14d-7396-5529-9178-627bbc041ee9": {
    name: "Golden Cross",
    logoFileId: "Logo_Human_19",
  },
  "85dc4379-26d7-5491-8313-75eadb73f241": {
    name: "Runner",
    logoFileId: "Logo_Human_20",
  },
  "0d5762aa-4ea4-5722-a258-1d0b82b63813": {
    name: "Orc Bomb",
    logoFileId: "Logo_Orc_13",
  },
  "3d03a94e-268a-54fc-bd65-4e3394b4b9d9": {
    name: "Final Blow",
    logoFileId: "Logo_Orc_14",
  },
  "fbec96ef-c5f5-5ed5-a6d3-913c690ff16d": {
    name: "Hideous Orc",
    logoFileId: "Logo_Orc_15",
  },
  "05d3f911-3700-53d8-ba54-70cffbe4ca70": {
    name: "Helmeted Orc",
    logoFileId: "Logo_Orc_16",
  },
  "4a448d34-a5a3-5dfd-840f-0d6a6caca9ea": {
    name: "Rage",
    logoFileId: "Logo_Orc_17",
  },
  "96e0d6e2-b501-50e8-8bc4-972cacebadbb": {
    name: "Bloodthirsty Star",
    logoFileId: "Logo_Orc_18",
  },
  "d365f4ae-65b1-5b03-9f74-f44de591c4ad": {
    name: "Goblin Eclipse",
    logoFileId: "Logo_Orc_19",
  },
  "ced42c12-eb2a-53ea-938e-fb7873273a3b": {
    name: "Scarlet Minotaur",
    logoFileId: "Logo_Orc_20",
  },
  "94331832-0e13-5cd5-8a41-29528d279f9b": {
    name: "Mark of the Horned Rat",
    logoFileId: "Logo_Skaven_02",
  },
  "704028c7-79da-5d2c-b031-bef8fce62ec3": {
    name: "Rat Shaman",
    logoFileId: "Logo_Skaven_03",
  },
  "9f5c22c5-1383-5da9-a221-f23c41b68dd1": {
    name: "Bearer of Warpstone",
    logoFileId: "Logo_Skaven_04",
  },
  "d91f6c16-0577-5b9e-8ea6-9760b9c25b5f": {
    name: "Skaven Legion",
    logoFileId: "Logo_Skaven_05",
  },
  "661f7ad2-ede6-5c69-be35-6ed4ba7ea53e": {
    name: "Stormvermin",
    logoFileId: "Logo_Skaven_06",
  },
  "da5c6441-c134-5ca4-92a0-d7ac346e4cea": {
    name: "Children of Warp",
    logoFileId: "Logo_Skaven_07",
  },
  "29fb643b-91b0-5cb4-995e-389b81f46684": {
    name: "Rat-O-Mancer",
    logoFileId: "Logo_Skaven_08",
  },
  "b5c1ecb0-98bf-5146-bc30-3cf376b2e650": {
    name: "Eshin Dagger",
    logoFileId: "Logo_Skaven_09",
  },
  "94231b64-427d-5586-8ec0-b8c9127246de": {
    name: "Unity of the Clans",
    logoFileId: "Logo_Skaven_10",
  },
  "18c137ca-ec87-5267-9e51-e276f37db8d5": {
    name: "Trophy",
    logoFileId: "Logo_Skaven_11",
  },
  "a5821fd3-e07a-5887-b60e-7bc0ae0a38bf": {
    name: "Clan Moulder",
    logoFileId: "Logo_Skaven_12",
  },
  "66910506-bc7f-54f8-9858-3842c4637076": {
    name: "Ball and Warp",
    logoFileId: "Logo_Skaven_13",
  },
  "2666ede4-f5ca-54c4-92eb-31f6872962cc": {
    name: "Skaven Claw",
    logoFileId: "Logo_Skaven_14",
  },
  "0fc2fdd5-7f86-5201-a0ef-bb8da208c4d2": {
    name: "Clan Ritual of Victory",
    logoFileId: "Logo_Skaven_15",
  },
  "216d0138-58dc-5e14-8cf5-721da0a6a8ac": {
    name: "For Them the Bell Tolls",
    logoFileId: "Logo_Skaven_16",
  },
  "9ba9169a-9beb-5d81-b570-b2599e40c58e": {
    name: "The Rat and the Skull",
    logoFileId: "Logo_Skaven_17",
  },
  "9149143f-f4e6-5fe9-91a3-eeb75b611f36": {
    name: "Final Laceration",
    logoFileId: "Logo_Skaven_18",
  },
  "1456c811-aac2-56d3-b4b7-795428a2bcc9": {
    name: "Feast",
    logoFileId: "Logo_Skaven_19",
  },
  "b94152b6-f522-5f86-a730-6a48525fc641": {
    name: "No Man Allowed",
    logoFileId: "Logo_Skaven_20",
  },
  "571da4e3-8354-5d3b-a384-1be9caa25e87": {
    name: "Eye of Chaos",
    logoFileId: "Logo_ChaosChosen_01",
  },
  "39336a02-0933-53fe-ac4c-b997b35f27ef": {
    name: "Star of Chaos",
    logoFileId: "Logo_ChaosChosen_02",
  },
  "86d8b9d5-557f-5f18-8fc4-bfd000681df3": {
    name: "Eye of Nurgle",
    logoFileId: "Logo_ChaosChosen_03",
  },
  "18250155-7276-50b0-bb7b-9378d17fa7a3": {
    name: "Third Eye",
    logoFileId: "Logo_ChaosChosen_04",
  },
  "b727a846-7939-5ebe-897a-47da23e54e11": {
    name: "Star of Fatality",
    logoFileId: "Logo_ChaosChosen_05",
  },
  "26fe2e41-7af4-50ef-9ecd-dca736337e54": {
    name: "Howler",
    logoFileId: "Logo_ChaosChosen_06",
  },
  "e0aa75a8-d407-58af-a40d-2615f164040e": {
    name: "Kiss of Chaos",
    logoFileId: "Logo_ChaosChosen_09",
  },
  "c792a55b-96d1-50a9-a0c9-099aad5db4a6": {
    name: "Chosen of Khorne",
    logoFileId: "Logo_ChaosChosen_10",
  },
  "9d129092-e499-529b-9dff-442d449ae4b0": {
    name: "Champion of Chaos",
    logoFileId: "Logo_ChaosChosen_11",
  },
  "999fe6f1-5eda-5775-925c-8ac9f0ae3b6a": {
    name: "Wyvern",
    logoFileId: "Logo_ChaosChosen_12",
  },
  "4a89ecbd-68d8-5a1e-87ee-bd979d2aaaef": {
    name: "Star of Khorne",
    logoFileId: "Logo_ChaosChosen_13",
  },
  "3a7d6725-b4f0-53c4-ae71-57ca46090594": {
    name: "Game of the Horned Rat",
    logoFileId: "Logo_ChaosChosen_14",
  },
  "e9061fca-ed2a-56b5-8b53-0fa0df15f6d2": {
    name: "Maw of Chaos",
    logoFileId: "Logo_ChaosChosen_15",
  },
  "1acd3685-8a3b-5f38-bce6-6dbba4a0378e": {
    name: "Grandfathers Benevolent Gaze",
    logoFileId: "Logo_ChaosChosen_16",
  },
  "4a3fddf1-7329-571d-9133-94b48612b74b": {
    name: "Smile of Slaanesh",
    logoFileId: "Logo_ChaosChosen_17",
  },
  "66c793ac-ac29-5f85-9e50-77f90f3794ee": {
    name: "Beasts of Chaos",
    logoFileId: "Logo_ChaosChosen_18",
  },
  "47d05d5e-f901-5ca9-8b25-89e01f5f5781": {
    name: "Demonic Adornment",
    logoFileId: "Logo_ChaosChosen_19",
  },
  "2a3823b2-38cf-5a7a-9ad5-3db9cc63934f": {
    name: "Vampire Spirit",
    logoFileId: "Logo_ChaosChosen_20",
  },
  "9f05efdd-ba59-5118-8275-17ffcc613046": {
    name: "Zephyr Spirit",
    logoFileId: "Logo_DarkElf_01",
  },
  "6ad054af-4eae-5b01-919b-48707e2e193a": {
    name: "Gaunt Moon",
    logoFileId: "Logo_DarkElf_02",
  },
  "f5f83de6-f96e-5de2-8f46-9fbd867141ea": {
    name: "Eternal Guard",
    logoFileId: "Logo_DarkElf_03",
  },
  "b1d4ef4b-343d-58dd-8f0d-9fa306ea154a": {
    name: "Abyssal Lion",
    logoFileId: "Logo_DarkElf_04",
  },
  "89ef2c7f-280f-5f33-9ff4-bd78087bdaca": {
    name: "Raging Death",
    logoFileId: "Logo_DarkElf_05",
  },
  "92983e0d-3e27-5b89-8c53-f5ea66751b07": {
    name: "Fiery Heart",
    logoFileId: "Logo_DarkElf_06",
  },
  "c10accbe-fdcf-5601-b3d6-8eb894372d61": {
    name: "Dark Priest of Blood Bowl",
    logoFileId: "Logo_DarkElf_07",
  },
  "94d560d3-75ac-5426-bc89-44c39420f0f2": {
    name: "Lethal Dagger",
    logoFileId: "Logo_DarkElf_08",
  },
  "bd4774e2-a85f-5212-997e-30de1e4e6f1e": {
    name: "Elves of Blood",
    logoFileId: "Logo_DarkElf_10",
  },
  "e279b9fb-af44-514f-a572-026c8344829e": {
    name: "Dragon Shield",
    logoFileId: "Logo_DarkElf_11",
  },
  "66e11d20-82de-50df-8e9f-8ff5eee2c393": {
    name: "Champion Hydra",
    logoFileId: "Logo_DarkElf_12",
  },
  "4886b4c8-bfcb-5a1a-bcfb-72a101a9f0b7": {
    name: "Salamander of Ice",
    logoFileId: "Logo_DarkElf_13",
  },
  "7b60626f-925f-5ca1-9d58-dab8236821cb": {
    name: "Black Pegasus",
    logoFileId: "Logo_DarkElf_14",
  },
  "6d3af68a-49a7-54f2-a1b0-dbd39de16236": {
    name: "Succubus",
    logoFileId: "Logo_DarkElf_15",
  },
  "c3011e1c-34f4-5eaa-972c-866fb78788c9": {
    name: "Mask of Naggoroth",
    logoFileId: "Logo_DarkElf_16",
  },
  "6a01bbc5-4a13-548d-be42-86c7519e01d7": {
    name: "Dracolich",
    logoFileId: "Logo_DarkElf_17",
  },
  "b190ddb3-60b2-53f8-846f-558bbbbcf369": {
    name: "Scarlet Gauntlet",
    logoFileId: "Logo_DarkElf_18",
  },
  "6ac10c1d-9feb-5068-8fb5-19012bdb3f6e": {
    name: "Mark of the Serpent",
    logoFileId: "Logo_DarkElf_19",
  },
  "af02bbbc-dc60-5764-a4b5-a8395e2f3c97": {
    name: "Raiders of the Black Arks",
    logoFileId: "Logo_DarkElf_20",
  },
  "08fe1bb3-678d-5dd2-9108-42807589b201": {
    name: "Golden Hammerer",
    logoFileId: "Logo_Dwarf_01",
  },
  "2d7008f9-dde1-5e2a-ab22-85de88f8713c": {
    name: "Runic Ball",
    logoFileId: "Logo_Dwarf_02",
  },
  "8a98cf73-defe-58fd-ae68-4bf918d55bad": {
    name: "Cut of the Axe",
    logoFileId: "Logo_Dwarf_03",
  },
  "63f3f9bb-250b-5820-abfe-365c98742b26": {
    name: "Grudge Bearer",
    logoFileId: "Logo_Dwarf_04",
  },
  "69b1e5c4-ade8-5cd7-83f2-586d542dd618": {
    name: "Celestial hammer",
    logoFileId: "Logo_Dwarf_05",
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
  | "d958bf9a-b4b9-5073-b325-da77dc4132cc"
  | "9df0c6c0-e4a5-500a-b1d2-68c8ab5cb8d9"
  | "bddb85ec-9aae-59f7-840c-1f286795c088"
  | "21d3f82d-9e19-58fc-a448-8de5eeb023d6"
  | "515a8429-1bed-54c5-96c9-3b18e4529938"
  | "af143149-35fe-55fa-84d6-00476aad4667"
  | "ebf7d7cb-1b8b-561e-9348-95090ccc9a53"
  | "f237e8d0-fb76-564e-b854-15a00c6d4469"
  | "26a095f3-1c66-5841-9be5-052aaadbdac0"
  | "de3e807c-c033-528d-9b0d-f04d3155cd5b"
  | "afdda955-5844-5579-9197-271c0e1d1f92"
  | "b3bb6cbd-7e9f-5110-bc56-3800657d8495"
  | "77edafff-7433-5d59-b0ab-074a82472ad9"
  | "e3699cc5-f117-5815-a089-104aaf6ff4d9"
  | "b468c199-88b2-5dcb-8429-d93ce0c0cd46"
  | "1a89880f-5f6a-5de9-aa56-c94d716fde63"
  | "090270e5-2e65-503a-b6c7-ecf777f8ec6c"
  | "b81ff481-2297-553c-b437-4282d78db9c2"
  | "19542c1d-cbb9-5b64-bc6d-73ecc602ee04"
  | "23667032-8170-552d-a554-6763d5419721"
  | "8e10d403-bcee-5bae-8baf-db6fbbdaca9f"
  | "a508b6d8-f231-578d-b5ad-a77f897596b1"
  | "88c7eba8-db57-505c-8313-c6876a5581ca"
  | "1b7e39f4-6606-59a8-967d-d60839d46409"
  | "54522410-ce9c-5927-bddb-ce713e91dcb9"
  | "dbfea705-5f24-55a3-81ef-19e71980908c"
  | "73341770-3e5d-5128-8424-5bb07843da88"
  | "3b1285a6-db55-5bf4-b3b7-9d7d5df92a63"
  | "7ca793eb-2345-5820-ad2e-b8ab7d820ecf"
  | "f255dce9-6f98-561a-a46c-182b5ea7d018"
  | "b0985b2d-5b5d-5231-a1f2-c7828d7eaf77"
  | "aac3afa8-2dea-5827-a7e0-7afef1a24a0e"
  | "9ffe0fe6-95a2-597d-9842-571e560a3002"
  | "25c0a3f2-3d51-5bf4-8ddc-e96959ba0b01"
  | "24247713-a8d0-5ed9-bfa9-62340e56d803"
  | "025acb16-077d-5e5b-a9b4-5ecda9a1f088"
  | "137664d3-a361-5afa-8d26-46f9e75012a8"
  | "48b109a5-c7aa-5c8e-b63c-cf1ec19191d6"
  | "794fd14d-7396-5529-9178-627bbc041ee9"
  | "85dc4379-26d7-5491-8313-75eadb73f241"
  | "0d5762aa-4ea4-5722-a258-1d0b82b63813"
  | "3d03a94e-268a-54fc-bd65-4e3394b4b9d9"
  | "fbec96ef-c5f5-5ed5-a6d3-913c690ff16d"
  | "05d3f911-3700-53d8-ba54-70cffbe4ca70"
  | "4a448d34-a5a3-5dfd-840f-0d6a6caca9ea"
  | "96e0d6e2-b501-50e8-8bc4-972cacebadbb"
  | "d365f4ae-65b1-5b03-9f74-f44de591c4ad"
  | "ced42c12-eb2a-53ea-938e-fb7873273a3b"
  | "94331832-0e13-5cd5-8a41-29528d279f9b"
  | "704028c7-79da-5d2c-b031-bef8fce62ec3"
  | "9f5c22c5-1383-5da9-a221-f23c41b68dd1"
  | "d91f6c16-0577-5b9e-8ea6-9760b9c25b5f"
  | "661f7ad2-ede6-5c69-be35-6ed4ba7ea53e"
  | "da5c6441-c134-5ca4-92a0-d7ac346e4cea"
  | "29fb643b-91b0-5cb4-995e-389b81f46684"
  | "b5c1ecb0-98bf-5146-bc30-3cf376b2e650"
  | "94231b64-427d-5586-8ec0-b8c9127246de"
  | "18c137ca-ec87-5267-9e51-e276f37db8d5"
  | "a5821fd3-e07a-5887-b60e-7bc0ae0a38bf"
  | "66910506-bc7f-54f8-9858-3842c4637076"
  | "2666ede4-f5ca-54c4-92eb-31f6872962cc"
  | "0fc2fdd5-7f86-5201-a0ef-bb8da208c4d2"
  | "216d0138-58dc-5e14-8cf5-721da0a6a8ac"
  | "9ba9169a-9beb-5d81-b570-b2599e40c58e"
  | "9149143f-f4e6-5fe9-91a3-eeb75b611f36"
  | "1456c811-aac2-56d3-b4b7-795428a2bcc9"
  | "b94152b6-f522-5f86-a730-6a48525fc641"
  | "571da4e3-8354-5d3b-a384-1be9caa25e87"
  | "39336a02-0933-53fe-ac4c-b997b35f27ef"
  | "86d8b9d5-557f-5f18-8fc4-bfd000681df3"
  | "18250155-7276-50b0-bb7b-9378d17fa7a3"
  | "b727a846-7939-5ebe-897a-47da23e54e11"
  | "26fe2e41-7af4-50ef-9ecd-dca736337e54"
  | "e0aa75a8-d407-58af-a40d-2615f164040e"
  | "c792a55b-96d1-50a9-a0c9-099aad5db4a6"
  | "9d129092-e499-529b-9dff-442d449ae4b0"
  | "999fe6f1-5eda-5775-925c-8ac9f0ae3b6a"
  | "4a89ecbd-68d8-5a1e-87ee-bd979d2aaaef"
  | "3a7d6725-b4f0-53c4-ae71-57ca46090594"
  | "e9061fca-ed2a-56b5-8b53-0fa0df15f6d2"
  | "1acd3685-8a3b-5f38-bce6-6dbba4a0378e"
  | "4a3fddf1-7329-571d-9133-94b48612b74b"
  | "66c793ac-ac29-5f85-9e50-77f90f3794ee"
  | "47d05d5e-f901-5ca9-8b25-89e01f5f5781"
  | "2a3823b2-38cf-5a7a-9ad5-3db9cc63934f"
  | "9f05efdd-ba59-5118-8275-17ffcc613046"
  | "6ad054af-4eae-5b01-919b-48707e2e193a"
  | "f5f83de6-f96e-5de2-8f46-9fbd867141ea"
  | "b1d4ef4b-343d-58dd-8f0d-9fa306ea154a"
  | "89ef2c7f-280f-5f33-9ff4-bd78087bdaca"
  | "92983e0d-3e27-5b89-8c53-f5ea66751b07"
  | "c10accbe-fdcf-5601-b3d6-8eb894372d61"
  | "94d560d3-75ac-5426-bc89-44c39420f0f2"
  | "bd4774e2-a85f-5212-997e-30de1e4e6f1e"
  | "e279b9fb-af44-514f-a572-026c8344829e"
  | "66e11d20-82de-50df-8e9f-8ff5eee2c393"
  | "4886b4c8-bfcb-5a1a-bcfb-72a101a9f0b7"
  | "7b60626f-925f-5ca1-9d58-dab8236821cb"
  | "6d3af68a-49a7-54f2-a1b0-dbd39de16236"
  | "c3011e1c-34f4-5eaa-972c-866fb78788c9"
  | "6a01bbc5-4a13-548d-be42-86c7519e01d7"
  | "b190ddb3-60b2-53f8-846f-558bbbbcf369"
  | "6ac10c1d-9feb-5068-8fb5-19012bdb3f6e"
  | "af02bbbc-dc60-5764-a4b5-a8395e2f3c97"
  | "08fe1bb3-678d-5dd2-9108-42807589b201"
  | "2d7008f9-dde1-5e2a-ab22-85de88f8713c"
  | "8a98cf73-defe-58fd-ae68-4bf918d55bad"
  | "63f3f9bb-250b-5820-abfe-365c98742b26"
  | "69b1e5c4-ade8-5cd7-83f2-586d542dd618"