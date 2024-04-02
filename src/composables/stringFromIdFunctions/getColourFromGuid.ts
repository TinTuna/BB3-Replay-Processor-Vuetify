type ColourData = {
    [guid: string]: {
        hex: string;
        name: string;
    }
}

export const getColourFromGuid = (guid: string): string => {
	if (colourData[guid]) {
		return colourData[guid].hex
	}
	console.warn(`Colour with guid ${guid} not found`)
    return "#cccccc"
}

const colourData: ColourData = {
    "85aada2a-8196-5baf-b364-f181b5f604ad": {
        hex: "#331c1c",
        name: "White Scar"
    },
	"ae0452b5-2a43-5cf4-bf6d-db73ab696e06": {
		hex: "#ffffff",
		name: "Corax White"
	},
	"c1446f0f-2bc1-585b-bcc9-e5b9881a273a": {
		hex: "#430e33",
		name: "Barak-Nar-Burgundy"
	},
	"c28bcf70-a1c9-544d-9df2-18ea3b2772c9": {
		hex: "#ab4d66",
		name: "Screamer Pink"
	},
	"5e818e61-de54-53cf-9597-1489ae3314c0": {
		hex: "#992f75",
		name: "Pink Horror"
	},
	"d79c79e8-1cd0-52a4-9c55-9b58dc44234d": {
		hex: "#b93e74",
		name: "Emperor's Children"
	},
	"8fe48c2f-96d6-54b1-bcb8-082e57374159": {
		hex: "#f4adcc",
		name: "Fulgrim Pink"
	},
	"7b352f36-2c1c-5437-b77d-3f1accbbca43": {
		hex: "#442b2c",
		name: "Rhinox Hide"
	},
	"eeaa1677-9465-5048-9265-dfe09fabfb0e": {
		hex: "#650000",
		name: "Khorne Red"
	},
	"f525cc03-a889-50fb-8837-06fcf41bd2e2": {
		hex: "#c33400",
		name: "Mephiston Red"
	},
	"39287a45-7171-5a03-a072-7d6fd0479cdd": {
		hex: "#872e2d",
		name: "Tuskgor Fur"
	},
	"259e03e9-2451-5878-99b2-48f4777cf00b": {
		hex: "#bc2c35",
		name: "Evil Sunz Scarlet"
	},
	"15dd9168-3a05-5af7-9a62-5ec97e958887": {
		hex: "#470600",
		name: "Mournfang Brown"
	},
	"3353288b-6ece-51d4-a1ee-e92ea27606dd": {
		hex: "#a94c40",
		name: "Squig Orange"
	},
	"11efe9bf-b3a3-5929-8b46-c7c2573bf974": {
		hex: "#d63800",
		name: "Wild Rider Red"
	},
	"c2b21da6-9339-50d9-91a1-e4db6b908bbd": {
		hex: "#814a41",
		name: "Bugmans Glow"
	},
	"017251b4-9897-5913-a1f8-26bf0cf06153": {
		hex: "#5f443c",
		name: "Gorthor Bown"
	},
	"f0f51286-60f9-5298-be60-f38b82b5a8d8": {
		hex: "#9d7359",
		name: "Deathclaw Brown"
	},
	"74532b77-7dc9-5725-b500-13aa3b415c1b": {
		hex: "#f79d83",
		name: "Lugganath Orange"
	},
	"22014a70-3d17-5e6a-aca7-f43f8710abed": {
		hex: "#aa6646",
		name: "Ratskin Flesh"
	},
	"9ccc2158-68c2-5052-b814-2b1acaddf21f": {
		hex: "#e67800",
		name: "Troll Slayer Orange"
	},
	"8b31d4b7-9722-5e2b-9509-4b43987be8bd": {
		hex: "#705945",
		name: "Stormvermin Fur"
	},	
	"eb169a75-d186-57b2-bf4d-17f76e7bed47": {
		hex: "#8c4600",
		name: "Skrag Brown"
	},
	"1dc90f47-8608-5412-869e-cdc40a15ab0a": {
		hex: "#d28a50",
		name: "Bestigor Flesh"
	},
	"1ed000e1-b8b5-58ed-80b2-9010d19870f0": {
		hex: "#be6b06",
		name: "Tau Light Ochre"
	},
	"5c9352ad-3dd2-5f02-bc9b-a71a4741fb0c": {
		hex: "#907d68",
		name: "Baneblade Brown"
	},
	"65ca2f7f-05f3-573a-8400-614aab4a694d": {
		hex: "#4c4c4c",
		name: "Skavenblight Dinge"
	},
	"cd29c8e1-5095-5bc3-92c2-d827bfcaf256": {
		hex: "#755035",
		name: "XV-88"
	},
	"e7559652-81c6-5a9d-88e9-c62d5b29d76b": {
		hex: "#d2a770",
		name: "Kislev Flesh"
	},
	"1e383987-177f-58d0-a7db-0244ba893678": {
		hex: "#a27502",
		name: "Tallarn Sand"
	},
	"eba41c05-c64a-56c8-9edd-6e525c750a31": {
		hex: "#dea200",
		name: "Zamesi Desert"
	},
	"aa7d4758-68b4-50c5-b7f3-5df2a5592623": {
		hex: "#f7af37",
		name: "Averland Sunset"
	},
	"3a8b88ee-a4be-5189-a24e-12796d7f4b12": {
		hex: "#ffe8c2",
		name: "Morghast Bone"
	},
	"caf48972-ea3c-5ae4-9a3b-6a24ce647241": {
		hex: "#26251e",
		name: "Dryad Bark"
	},
	"d24497fd-2c93-5997-bbc2-46361795ed49": {
		hex: "#9a8f55",
		name: "Zandri Dust"
	},
	"578d8fe9-157d-5183-98b1-a15f8db882e8": {
		hex: "#c8b999",
		name: "Wraithbone"
	},
	"e89cf4a7-6c9a-5899-9681-a70c9a650dc3": {
		hex: "#ffda00",
		name: "Yriel Yellow"
	},
	"32d4df8b-3bd7-5eaa-a3b8-9d4140fb11b8": {
		hex: "#fff400",
		name: "Flash Gitz Yellow"
	},
	"8b210451-070e-55d7-9830-513c394a07d7": {
		hex: "#fff659",
		name: "Dorn Yellow"
	},
	"17d0ef81-2a0f-5eb4-9093-f655eb0fd75c": {
		hex: "#bebd7f",
		name: "Krieg Khaki"
	},
	"e968f2f7-3667-59b1-95e9-71f7f9a6e626": {
		hex: "#848f40",
		name: "Deathworld Forest"
	},
	"da549cb0-eb84-5a7d-a60d-fdbf19403723": {
		hex: "#79b93b",
		name: "Ogryn Camo"
	},
	"b143e7ee-5e7f-57f1-b2e7-519ebf941066": {
		hex: "#cecbbe",
		name: "Pallid Wych Flesh"
	},
	"eacae928-b140-5bf5-aefc-cb30bf256540": {
		hex: "#c8beab",
		name: "Screaming Skull"
	},
	"f0d6338a-688a-5ba1-a6ea-f3b352e974ce": {
		hex: "#73982f",
		name: "Straken Green"
	},
	"495761e6-1683-59b3-a64b-0f8b0440b3ff": {
		hex: "#6b8e2d",
		name: "Elysian Green"
	},
	"e3c387ba-c72a-523a-b2fa-f04418c48d62": {
		hex: "#466c1f",
		name: "Loren Forest"
	},
	"b306c673-bba5-528a-a57f-b178e71e8457": {
		hex: "#21450d",
		name: "Castellan Green"
	},
	"807e69f6-8cd8-5f43-ad08-3c260971e08a": {
		hex: "#abb9a1",
		name: "Deepkin Flesh"
	},
	"f940c941-4c9d-5917-adf8-49389b9f241a": {
		hex: "#51504e",
		name: "Dawnstone"
	},
	"da5f2a65-fca3-5237-ac96-3aeacacba6cf": {
		hex: "#067025",
		name: "Warpstone Glow"
	},
	"a24adab8-79c1-577d-8d1d-47cefcfc5b16": {
		hex: "#003a0d",
		name: "Caliban Green"
	},
	"5093b962-8286-55f8-9f99-f8074bd9b803": {
		hex: "#57906b",
		name: "Skarsnik Green"
	},
	"e186732b-528c-55d7-903f-8d696b916b6a": {
		hex: "#2d7f56",
		name: "Warboss Green"
	},
	"ad0d2276-9ef9-5dc0-90bd-8bd7114eaef9": {
		hex: "#0fa366",
		name: "Sybarite Green"
	},
	"276d8087-d365-5cd8-9471-d631f24f38d7": {
		hex: "#d4d7e1",
		name: "Ulthuan Grey"
	},
	"a05cc934-4eb9-5522-9cbf-937fe14d657d": {
		hex: "#0e2524",
		name: "Nocturne Green"
	},
	"02f932c1-c44f-5cec-9721-208e21e5c12b": {
		hex: "#559da1",
		name: "Temple Guard Blue"
	},
	"7596c855-c659-5f5d-9444-5500be7dc1a4": {
		hex: "#314c4a",
		name: "Dark Reaper"
	},
	"00373843-fa23-5dba-b241-2d27a0a1582e": {
		hex: "#27343d",
		name: "Incubi Darkness"
	},
	"0b79c94d-ac8a-5095-b0d7-b00f342f2465": {
		hex: "#4c5b63",
		name: "Mechanicus Standard Grey"
	},
	"165a4c68-9d4b-525c-8b7c-7d5e2e129425": {
		hex: "#679999",
		name: "Sotek Green"
	},
	"462c30d3-54e8-509f-b453-b2d99f63a22b": {
		hex: "#366a70",
		name: "Thunderhawk Blue"
	},
	"8ae0373f-90de-5f67-b8f1-a8d8da9d6eef": {
		hex: "#00708b",
		name: "Ahriman Blue"
	},
	"6e9c34b5-29a9-502c-b5e8-5c47b0a04d95": {
		hex: "#6abedd",
		name: "Baharroth Blue"
	},
	"3d5d8b91-14fb-5736-aa7b-a3b74fe0d4a6": {
		hex: "#279dce",
		name: "Lothern Blue"
	},
	"c9bea22a-9e7d-5bb7-9dc9-4630ad9460d3": {
		hex: "#5a6d76",
		name: "Russ Grey"
	},
	"28b4ceb6-6519-50b7-8990-dec8b9e0f93d": {
		hex: "#4c5470",
		name: "The Fang"
	},
	"43e4c6cb-0615-5126-8d71-0729153e37fe": {
		hex: "#00265c",
		name: "Night Lords Blue"
	},
	"255bee68-732a-5785-8712-0bb4463c6e55": {
		hex: "#4c575f",
		name: "Eshin Grey"
	},
	"4573ef4a-0476-5db0-b6f9-294f6fac7fa4": {
		hex: "#848484",
		name: "Grey Seer"
	},
	"b7c48b42-e9a6-5a89-89f4-1d1804e0cd99": {
		hex: "#6d95b5",
		name: "Fenrisian Grey"
	},
	"60034464-0b9d-5f76-9b8b-114978474a18": {
		hex: "#33669b",
		name: "Caledor Sky"
	},
	"edb0f303-291a-56c0-95b0-2247c23a3fe7": {
		hex: "#063a7d",
		name: "Macragge Blue"
	},
	"d2013dd6-558a-5d49-bc81-c43f4636713a": {
		hex: "#3578c1",
		name: "Teclis Blue"
	},
	"1cb9661c-8a42-592f-bd65-2f6a3ff72387": {
		hex: "#4a79b1",
		name: "Hoeth Blue"
	},
	"396f59f2-f6d8-5967-a31b-4f36c9fa3c1d": {
		hex: "#a0b7d0",
		name: "Blue Horror"
	},
	"fd50ccd3-5664-570b-ab0f-a02d17e6676b": {
		hex: "#0856ba",
		name: "Altdorf Guard Blue"
	},
	"77e8271a-6ce5-56e1-bc7a-727bc140fa12": {
		hex: "#5a5d6b",
		name: "Warpfiend Grey"
	},
	"98f28c49-5cba-5081-88df-52cfa781f11a": {
		hex: "#57447c",
		name: "Naggaroth Night"
	},
	"d1c37583-e9e8-596f-b216-62004746c9fe": {
		hex: "#8241a0",
		name: "Genestealer Purple"
	},
	"d7a61bdd-774e-52b0-8dd5-46e4fe2eba85": {
		hex: "#8969b0",
		name: "Kakophoni Purple"
	},
	"663aeb3c-ee10-51b1-bcc8-6700be5c0ded": {
		hex: "#450959",
		name: "Xereus Purple"
	},
	"8c95044d-1d49-5b60-8a59-f93a5ddea363": {
		hex: "#592949",
		name: "Gal Vorbak Red"
	},
	"eca81547-0119-5439-8806-6fa833503195": {
		hex: "#f14517",
		name: "Jokaero Orange"
	},
	"d23c9d6b-0df2-5710-ab87-6de83ba176b8": {
		hex: "#00155d",
		name: "Kantor Blue"
	},
	"d264c494-2ba0-5516-af7f-3b4ecb70d2a1": {
		hex: "#c0a7d2",
		name: "Dechala Lilac"
	},
	"a18060c0-7a1f-5b75-92f7-7f73672b056a": {
		hex: "#009872",
		name: "Kabalite Green"
	},
	"65f89a2b-3c90-5a01-893c-480fb62f1e62": {
		hex: "#f7965d",
		name: "Fire Dragon Bright"
	},
	"a7ae1116-bf38-508e-8d02-25db70c60392": {
		hex: "#970300",
		name: "Wazdakka Red"
	},
	"e3aba2aa-91f3-550b-86d3-057fe104917b": {
		hex: "#9ab0b0",
		name: "Celestra Grey"
	},
	"4f5a3cf2-9fd9-5534-b2ba-2cf8edaa28ac": {
		hex: "#3a5e94",
		name: "Alaitoc Blue"
	},
	"6109ed30-5e21-5617-8dd5-43bcb9517cc4": {
		hex: "#756f90",
		name: "Daemonette Hide"
	},
	"b7bc6f95-f596-55ae-b8a5-827c061b0b10": {
		hex: "#675d38",
		name: "Steel Legion Drab"
	},
	"b3781b8a-7bed-5b88-947e-6fb9c62b5e86": {
		hex: "#005f7e",
		name: "Thousand Sons Blue"
	},
	"313ff9c8-149d-5832-a975-9faa05147e26": {
		hex: "#4abb52",
		name: "Moot Green"
	},
	"ac67882f-3454-5060-94c2-94645bac2a2b": {
		hex: "#003635",
		name: "Lupercal Green"
	},
	"045950b3-aec9-531c-956c-4feed121231e": {
		hex: "#aaa79c",
		name: "Rakarth Flesh"
	},
	"dfcd4c18-740d-5280-999a-ec8ff2f26d2b": {
		hex: "#8ecbb2",
		name: "Gauss Blaster Green"
	},
	"ad3c98ac-0d57-51df-9cb3-2c125c99f400": {
		hex: "#520061",
		name: "Phoenician Purple"
	},
	"c6bfaa4f-38a9-5e5b-b521-f89f8b7ed44f": {
		hex: "#9a97a1",
		name: "Slaanesh Grey"
	},
	"339a109b-01f3-519a-b245-e7f7bc446f28": {
		hex: "#966303",
		name: "Balor Brown"
	},
	"40282a42-85e7-56e2-b826-2d17438289d1": {
		hex: "#ffe700",
		name: "Phalanx Yellow"
	},
	"2c6dc602-e726-5dc5-a4e0-b1285fbcd525": {
		hex: "#1b1517",
		name: "Corvus Black"
	},
	"e2d97ca5-91f5-53ce-b16d-8c19e0e8a788": {
		hex: "#720000",
		name: "Word Bearers Red"
	},
	"a7c5583d-ca8d-58d8-9f38-130d24a1deb5": {
		hex: "#8ea66e",
		name: "Nurgling Green"
	},
	"d8b270": {
		hex: "#d8b270",
		name: "Ungor Flesh"
	},
	"2a4939": {
		hex: "#2a4939",
		name: "Vulkan Green"
	},
	"00536d": {
		hex: "#00536d",
		name: "Stegadon Scale Green"
	},
	"a77573": {
		hex: "#a77573",
		name: "Knight-Questor Flesh"
	},
	"52352d": {
		hex: "#52352d",
		name: "Catachan Fleshtone"
	},
	"f1ce92": {
		hex: "#f1ce92",
		name: "Flayed One Flesh"
	},
	"c2a26c": {
		hex: "#c2a26c",
		name: "Karak Stone"
	},
	"7a5656": {
		hex: "#7a5656",
		name: "Bloodreaver Flesh"
	},
	"660000": {
		hex: "#660000",
		name: "Doombull Brown"
	},
	"a7aaa2": {
		hex: "#a7aaa2",
		name: "Administratum Grey"
	},
	"34578e": {
		hex: "#34578e",
		name: "Calgar Blue"
	},
	"ce8661": {
		hex: "#ce8661",
		name: "Cadian Fleshtone"
	},
	"b8ae83": {
		hex: "#b8ae83",
		name: "Ushabti Bone"
	},
	"4a5346": {
		hex: "#4a5346",
		name: "Death Korps Drab"
	}
}