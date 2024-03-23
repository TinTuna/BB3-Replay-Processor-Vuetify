import { SkillId } from "@/types/IdTypes/SkillId";

export type SkillData = {
  name: string;
  description: string;
  icon: string;
  skillCategory: string;
  id: SkillId;
};

export const getSkillDataFromId = (skillId: SkillId): SkillData => {
  if (skillList[skillId]) return skillList[skillId];
  return {
    name: "Unknown Skill" + " " + skillId,
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: skillId,
  };
};

const skillList: { [key in SkillId]: SkillData } = {
  "1": {
    name: "Strip Ball",
    description:
      "When choosing pushed back on a Block action against a Player carrying the Ball, the latter falls into the destination Square and Bounce.",
    icon: new URL("/icons/skills/1.jpg", import.meta.url).href,
    skillCategory: "General",
    id: "1",
  },
  "2": {
    name: "Unknown Skill" + " 2",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "2",
  },
  "3": {
    name: "Unknown Skill" + " 3",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "3",
  },
  "4": {
    name: "Unknown Skill" + " 4",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "4",
  },
  "5": {
    name: "Unknown Skill" + " 5",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "5",
  },
  "6": {
    name: "Catch",
    description: "This Player can Re-roll all Catch tests.",
    icon: new URL("/icons/skills/6.jpg", import.meta.url).href,
    skillCategory: "Agility",
    id: "6",
  },
  "7": {
    name: "Dodge",
    description:
      "Once per Turn and per activation, this Player can Re-roll a failed Dodge test. Moreover, this Player can choose to use this Skill when he is the target of a Block and the result is a Stumble.",
    icon: new URL("/icons/skills/7.jpg", import.meta.url).href,
    skillCategory: "Agility",
    id: "7",
  },
  "8": {
    name: "Sprint",
    description: "This Player can attempt to Rush three times instead of two.",
    icon: new URL("/icons/skills/8.jpg", import.meta.url).href,
    skillCategory: "Agility",
    id: "8",
  },
  "9": {
    name: "Unknown Skill" + " 9",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "9",
  },
  "10": {
    name: "Foul Appearance",
    description:
      "When an opposition Player declares a Block action or a Special action against this Player, the action is lost on a D6 result of 1. This Skill may still be used if the Player is Prone, Stunned, or has lost their Tackle Zone.",
    icon: new URL("/icons/skills/10.jpg", import.meta.url).href,
    skillCategory: "Mutation",
    id: "10",
  },
  "11": {
    name: "Leap",
    description:
      "This Player can Jump over any Square during his Movement Allowance, including a Square occupied by a Standing Player. Moreover, it reduces any Agility penalty by 1 for any attempts at jumping (to a minimum of -1).",
    icon: new URL("/icons/skills/11.jpg", import.meta.url).href,
    skillCategory: "Agility",
    id: "11",
  },
  "12": {
    name: "Extra Arms",
    description:
      "A player with the Extra Arms skill may add +1 on Pick up and Catch tests or when he tries to interfere with a Pass.",
    icon: new URL("/icons/skills/12.jpg", import.meta.url).href,
    skillCategory: "Mutation",
    id: "12",
  },
  "13": {
    name: "Mighty Blow (+1)",
    description:
      "When an opponent is Knocked down following a Block by this Player, you can change the Armour Value or Injury test by +1. This modifier can be applied after the test. This Skill is not usable with Stab or Chainsaw.",
    icon: new URL("/icons/skills/13.jpg", import.meta.url).href,
    skillCategory: "Strength",
    id: "13",
  },
  "14": {
    name: "Leader",
    description:
      "Grants a Team reroll if one or several Players with this Skill are on the Pitch. This reroll is lost if the Players with the Skill are removed from the Pitch before its use. Can be carried over to extra time if not used. Can't be lost because of a Halfling Master Chef.",
    icon: new URL("/icons/skills/14.jpg", import.meta.url).href,
    skillCategory: "Passing",
    id: "14",
  },
  "15": {
    name: "Horns",
    description:
      "A player with the Horns skill may add 1 to his Strength when he makes a Blitz action.",
    icon: new URL("/icons/skills/15.jpg", import.meta.url).href,
    skillCategory: "Mutation",
    id: "15",
  },
  "16": {
    name: "Two Heads",
    description:
      "A player with the Two Heads skill may add 1 to his Agility when he makes a Dodge roll.",
    icon: new URL("/icons/skills/16.jpg", import.meta.url).href,
    skillCategory: "Mutation",
    id: "16",
  },
  "17": {
    name: "Stand Firm",
    description:
      "A player with the Stand Firm skill may choose to remain standing when he is pushed back by an opposing player's block.",
    icon: new URL("/icons/skills/17.jpg", import.meta.url).href,
    skillCategory: "Strength",
    id: "17",
  },
  "18": {
    name: "Unknown Skill" + " 18",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "18",
  },
  "19": {
    name: "Regeneration",
    description:
      "A player with the Regeneration skill rolls a D6 when he takes a Casualty. On a 1-3 the Casualty is applied. On a 4+ the Casualty is cancelled and the Player is placed in the Reserves box. This Trait may still be used if the Player is Prone, Stunned or has lost their Tackle Zone.",
    icon: new URL("/icons/skills/19.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
    id: "19",
  },
  "20": {
    name: "Unknown Skill" + " 20",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "20",
  },
  "21": {
    name: "Accurate",
    description:
      "A player with the Accurate skill adds +1 on PA tests for a Quick pass or Short pass.",
    icon: new URL("/icons/skills/21.jpg", import.meta.url).href,
    skillCategory: "Passing",
    id: "21",
  },
  "22": {
    name: "Break Tackle",
    description:
      "Once per activation, after a Dodge test and if his ST is 4 or less, the result can be changed by +1. If it is 5 or more, it is changed by +2.",
    icon: new URL("/icons/skills/22.jpg", import.meta.url).href,
    skillCategory: "Strength",
    id: "22",
  },
  "23": {
    name: "Sneaky Git",
    description:
      "This Player is not Sent off on a natural double during an Armour Value test when he commits a Foul. Moreover, his activation does not end after a Foul, and he can continue to move.",
    icon: new URL("/icons/skills/23.jpg", import.meta.url).href,
    skillCategory: "Agility",
    id: "23",
  },
  "24": {
    name: "Unknown Skill" + " 24",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "24",
  },
  "25": {
    name: "Unknown Skill" + " 25",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "25",
  },
  "26": {
    name: "Dauntless",
    description:
      "When this Player attempts a Block or a Blitz on a target whose ST is higher than his own (before any Assists, but after other modifiers), a D6 result is added to the ST of the Player. If the total is superior to the target's ST, the ST of the Player is increased to be equal to that of the target.",
    icon: new URL("/icons/skills/26.jpg", import.meta.url).href,
    skillCategory: "General",
    id: "26",
  },
  "27": {
    name: "Dirty Player",
    description:
      "During a Foul action performed by this Player, the result of the Armour Value or the Injury test can be modified by the amount shown in brackets after the Skill.",
    icon: new URL("/icons/skills/27.jpg", import.meta.url).href,
    skillCategory: "General",
    id: "27",
  },
  "28": {
    name: "Diving Catch",
    description:
      "This Player can attempt to Catch the ball if it lands in his Tackle Zone as a result of a Pass, a throw or a Kick-off. Moreover, he gains +1 to catch an Accurate pass if he is in the target Square.",
    icon: new URL("/icons/skills/28.jpg", import.meta.url).href,
    skillCategory: "Agility",
    id: "28",
  },
  "29": {
    name: "Dump Off",
    description:
      "If this Player is the target of a Block action (or of an action that replaces a Block) and he is carrying the Ball, he can immediately make a Quick pass that works normally except that it cannot lead to a Turnover.",
    icon: new URL("/icons/skills/29.jpg", import.meta.url).href,
    skillCategory: "Passing",
    id: "29",
  },
  "30": {
    name: "Block",
    description:
      "This Skill allows the Player who possesses it to not be Knocked down when a Both Down is chosen on a Block action.",
    icon: new URL("/icons/skills/30.jpg", import.meta.url).href,
    skillCategory: "General",
    id: "30",
  },
  "31": {
    name: "Unknown Skill" + " 31",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "31",
  },
  "32": {
    name: "Very Long Legs",
    description:
      "The player reduces by 1, to a minimum of -1, any negative modifier applied to the Agility test when Jumping over a Prone or Stunned player (or to Leap over an empty square or a square occupied by a Standing player, if this player has the Leap skill). Moreover, he gains +2 to attempts to Interfere with a Pass. Finally, he ignores the Cloud Burster Skill.",
    icon: new URL("/icons/skills/32.jpg", import.meta.url).href,
    skillCategory: "Mutation",
    id: "32",
  },
  "33": {
    name: "Disturbing Presence",
    description:
      "When an opposition Player attempts a Pass, Throw Team-Mate or Throw Bomb action, or he tries to interfere with a Pass or to Catch the ball, he applies a -1 modifier for each Player within 3 Squares who has this Skill, whatever the state of these Players.",
    icon: new URL("/icons/skills/33.jpg", import.meta.url).href,
    skillCategory: "Mutation",
    id: "33",
  },
  "34": {
    name: "Diving Tackle",
    description:
      "If an opposition Player succeeds in an Agility test when trying to leave a Square Marked by this Player, you can use this Skill. Your Player is placed Prone in the Square freed by the opponent. The opponent deducts 2 from his Agility test.",
    icon: new URL("/icons/skills/34.jpg", import.meta.url).href,
    skillCategory: "Agility",
    id: "34",
  },
  "35": {
    name: "Fend",
    description:
      "An opposition Player who pushes this Player cannot Follow up. Cannot be used after a chain-push, nor against a Player who has Ball & Chain or Juggernaut.",
    icon: new URL("/icons/skills/35.jpg", import.meta.url).href,
    skillCategory: "General",
    id: "35",
  },
  "36": {
    name: "Frenzy",
    description:
      "Each time this Player carries out a Block action, he must attempt a Follow up each time it is possible. He must then attempt a second Block action against the same target. A Player with this Skill cannot have Grab.",
    icon: new URL("/icons/skills/36.jpg", import.meta.url).href,
    skillCategory: "General",
    id: "36",
  },
  "37": {
    name: "Grab",
    description:
      "When this Player performs a Block action, this Skill prevents the use of Sidestep. Moreover, if during a Block (but not a Blitz) the target Player is pushed back, any Square adjacent to the target can be chosen. A Player with Grab cannot have Frenzy.",
    icon: new URL("/icons/skills/37.jpg", import.meta.url).href,
    skillCategory: "Strength",
    id: "37",
  },
  "38": {
    name: "Guard",
    description:
      "This Player offers offensive and defensive Assists, no matter how many Players are Marking him.",
    icon: new URL("/icons/skills/38.jpg", import.meta.url).href,
    skillCategory: "Strength",
    id: "38",
  },
  "39": {
    name: "Hail Mary Pass",
    description:
      "When this Player performs a Pass action (or a Throw Bomb), the target can be any Square on the Pitch. A Pass action using this Skill is neither accurate, nor can it be intercepted by an opposition Player. Cannot be used in a Blizzard.",
    icon: new URL("/icons/skills/39.jpg", import.meta.url).href,
    skillCategory: "Passing",
    id: "39",
  },
  "40": {
    name: "Juggernaut",
    description:
      "When this Player performs a Block during a Blitz, he can choose to consider a Both Down result as a pushed back. Moreover, under these same conditions, the target of the Block cannot use the Fend, Stand Firm and Wrestle Skills.",
    icon: new URL("/icons/skills/40.jpg", import.meta.url).href,
    skillCategory: "Strength",
    id: "40",
  },
  "41": {
    name: "Jump Up",
    description:
      "If this Player is Prone, they can stand up at no cost. Moreover, if they are Prone during their activation, they can attempt a Jump up and perform a Block. To do this, they must succeed an Agility test, with a +1 modifier. If they fail, they remain Prone and their activation ends. This Skill may still be used if the Player is Prone or has lost their Tackle Zone.",
    icon: new URL("/icons/skills/41.jpg", import.meta.url).href,
    skillCategory: "Agility",
    id: "41",
  },
  "42": {
    name: "Unknown Skill" + " 42",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "42",
  },
  "43": {
    name: "Unknown Skill" + " 43",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "43",
  },
  "44": {
    name: "Loner",
    description:
      "If this Player wants to use a Team re-roll, roll a D6. If the result is equal to or greater than 4, this Player plays normally. On any other result, the first result is kept and the Team re-roll is lost. This Trait may still be used if the Player is Prone or has lost their Tackle Zone.",
    icon: new URL("/icons/skills/44.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
    id: "44",
  },
  "45": {
    name: "Nerves of Steel",
    description:
      "Cancels the Marking modifiers on a Pass, an attempt to Catch the ball or Interfere.",
    icon: new URL("/icons/skills/45.jpg", import.meta.url).href,
    skillCategory: "Passing",
    id: "45",
  },
  "46": {
    name: "Unknown Skill" + " 46",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "46",
  },
  "47": {
    name: "Pass",
    description:
      "This Player can Reroll a failed Passing Ability test on a Pass action.",
    icon: new URL("/icons/skills/47.jpg", import.meta.url).href,
    skillCategory: "Passing",
    id: "47",
  },
  "48": {
    name: "Unknown Skill" + " 48",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "48",
  },
  "49": {
    name: "Prehensile Tail",
    description:
      "A player with the Prehensile Tail gives -1 to Dodge, Jump up or Leap tests for an opponent who tries to leave a Square Marked by this Player.",
    icon: new URL("/icons/skills/49.jpg", import.meta.url).href,
    skillCategory: "Mutation",
    id: "49",
  },
  "50": {
    name: "Pro",
    description:
      "During his activation, this Player can Re-roll a dice except for Armour Value, Injury and Casualty tests. On 3+ on a D6 he can Re-roll his dice.",
    icon: new URL("/icons/skills/50.jpg", import.meta.url).href,
    skillCategory: "General",
    id: "50",
  },
  "51": {
    name: "Unknown Skill" + " 51",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "51",
  },
  "52": {
    name: "Unknown Skill" + " 52",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "52",
  },
  "53": {
    name: "Safe Pass",
    description:
      "If this Player fumbles a Pass action, he keeps the Ball and his activation ends.",
    icon: new URL("/icons/skills/53.jpg", import.meta.url).href,
    skillCategory: "Passing",
    id: "53",
  },
  "54": {
    name: "Unknown Skill" + " 54",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "54",
  },
  "55": {
    name: "Shadowing",
    description:
      "This Player can use this Skill when an opponent leaves a Square that he was Marking. Roll a D6 + MA of this Player - MA of the opponent. On a roll of 6+, or on a natural 6, this Player can move into the vacated Square without a Dodge roll.",
    icon: new URL("/icons/skills/55.jpg", import.meta.url).href,
    skillCategory: "General",
    id: "55",
  },
  "56": {
    name: "Sidestep",
    description:
      "If this Player is pushed back, you (not the opposition Manager) choose an adjacent unoccupied Square as destination.",
    icon: new URL("/icons/skills/56.jpg", import.meta.url).href,
    skillCategory: "Agility",
    id: "56",
  },
  "57": {
    name: "Tackle",
    description:
      "Prevents opposition Players in Squares Marked by this Player from using the Dodge Skill.",
    icon: new URL("/icons/skills/57.jpg", import.meta.url).href,
    skillCategory: "General",
    id: "57",
  },
  "58": {
    name: "Strong Arm",
    description:
      "A player with the Strong Arm skill gets +1 on PA tests for a Throw Team-Mate action. A Player that does not have the Throw team-mate Trait cannot have this Skill.",
    icon: new URL("/icons/skills/58.jpg", import.meta.url).href,
    skillCategory: "Strength",
    id: "58",
  },
  "59": {
    name: "Stunty",
    description:
      "On Agility tests for a Dodge, this player ignores the -1 marking penalty on the square he has just occupied. Bombardier, Chainsaw and Swoop cancel this advantage. However, an opposition player gains +1 on his Agility test when he Interferes with a pass by this player.",
    icon: new URL("/icons/skills/59.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
    id: "59",
  },
  "60": {
    name: "Sure Feet",
    description:
      "Once per Team Turn during his activation, this Player can Re-roll the D6 during a Rush.",
    icon: new URL("/icons/skills/60.jpg", import.meta.url).href,
    skillCategory: "Agility",
    id: "60",
  },
  "61": {
    name: "Sure Hands",
    description:
      "This Player can Re-roll a Pick up test. Moreover, the Strip Ball Skill cannot be used against this Player.",
    icon: new URL("/icons/skills/61.jpg", import.meta.url).href,
    skillCategory: "General",
    id: "61",
  },
  "62": {
    name: "Unknown Skill" + " 62",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "62",
  },
  "63": {
    name: "Thick Skull",
    description:
      "A player with the Thick Skull skill Is Stunned on an roll of 8 and KOd on a roll of 9. Other results are unchanged. This Skill IS cumulative with the Stunty Skill.",
    icon: new URL("/icons/skills/63.jpg", import.meta.url).href,
    skillCategory: "Strength",
    id: "63",
  },
  "64": {
    name: "Unknown Skill" + " 64",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "64",
  },
  "65": {
    name: "Unknown Skill" + " 65",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "65",
  },
  "66": {
    name: "Unknown Skill" + " 66",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "66",
  },
  "67": {
    name: "Unknown Skill" + " 67",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "67",
  },
  "68": {
    name: "Wrestle",
    description:
      "This Player uses this Skill on a Both Down result when he is the initiator or the target of a Block action. Instead, the two Players are placed Prone without taking into account the other Skills they may have and no Turnover is caused.",
    icon: new URL("/icons/skills/68.jpg", import.meta.url).href,
    skillCategory: "General",
    id: "68",
  },
  "69": {
    name: "Tentacles",
    description:
      "When an opponent tries to leave a Square Marked by this Player, roll a D6 +ST of the Player -ST of the opponent. On a roll of 6+, or on a natural 6, the opponent remains where he is and his Move ends.",
    icon: new URL("/icons/skills/69.jpg", import.meta.url).href,
    skillCategory: "Mutation",
    id: "69",
  },
  "70": {
    name: "Multiple Block",
    description:
      "On a Block, but not a Blitz, this Player can attempt a Block action on two Players he is Marking, by reducing his ST by 2 for this activation. The Block actions are simultaneous and are resolved independently of the result of each one.",
    icon: new URL("/icons/skills/70.jpg", import.meta.url).href,
    skillCategory: "Strength",
    id: "70",
  },
  "71": {
    name: "Kick",
    description:
      "If this Player is the kicker of the Ball at Kick-off, you can choose to halve the deviation of the Ball by D6/2, rounding any fractions down.",
    icon: new URL("/icons/skills/71.jpg", import.meta.url).href,
    skillCategory: "General",
    id: "71",
  },
  "72": {
    name: "Unknown Skill" + " 72",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "72",
  },
  "73": {
    name: "Unknown Skill" + " 73",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "73",
  },
  "74": {
    name: "Big Hand",
    description:
      "This Player ignores Marked and Pouring Rain modifiers during a Pick up test.",
    icon: new URL("/icons/skills/74.jpg", import.meta.url).href,
    skillCategory: "Mutation",
    id: "74",
  },
  "75": {
    name: "Claws",
    description:
      "When a Player with this Skill Knock Down an opponent, the latter's Armour Value is always broken on an unmodified result of 8+.",
    icon: new URL("/icons/skills/75.jpg", import.meta.url).href,
    skillCategory: "Mutation",
    id: "75",
  },
  "76": {
    name: "Unknown Skill" + " 76",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "76",
  },
  "77": {
    name: "Unknown Skill" + " 77",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "77",
  },
  "78": {
    name: "Unknown Skill" + " 78",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "78",
  },
  "79": {
    name: "Unknown Skill" + " 79",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "79",
  },
  "80": {
    name: "Unknown Skill" + " 80",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "80",
  },
  "81": {
    name: "Decay",
    description:
      "A player with the Decay skill gets +1 on tests made on the Casualties table against them.",
    icon: new URL("/icons/skills/81.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
    id: "81",
  },
  "82": {
    name: "Unknown Skill" + " 82",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "82",
  },
  "83": {
    name: "Unknown Skill" + " 83",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "83",
  },
  "84": {
    name: "Unknown Skill" + " 84",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "84",
  },
  "85": {
    name: "Unknown Skill" + " 85",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "85",
  },
  "86": {
    name: "Unknown Skill" + " 86",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "86",
  },
  "87": {
    name: "Unknown Skill" + " 87",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "87",
  },
  "88": {
    name: "Cannoneer",
    description:
      "A player with the Cannoneer skill adds +1 on PA tests for a Long pass or Long bomb.",
    icon: new URL("/icons/skills/88.jpg", import.meta.url).href,
    skillCategory: "Passing",
    id: "88",
  },
  "89": {
    name: "Unknown Skill" + " 89",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "89",
  },
  "90": {
    name: "Defensive",
    description:
      "During the Turn of your opponent, any Player Marked by this Player cannot use the Guard Skill.",
    icon: new URL("/icons/skills/90.jpg", import.meta.url).href,
    skillCategory: "Agility",
    id: "90",
  },
  "91": {
    name: "Arm Bar",
    description:
      "If an opponent, Marked by at least one Player with this Skill, fails a Dodge, Leap or Jump over test, +1 is applied to Armour Value or Injury tests.",
    icon: new URL("/icons/skills/91.jpg", import.meta.url).href,
    skillCategory: "Strength",
    id: "91",
  },
  "92": {
    name: "Iron Hard Skin",
    description:
      "The Claws mutation cannot be used against this Player. This Skill may still be used if the Player is Prone, Stunned, or has lost their Tackle Zone.",
    icon: new URL("/icons/skills/92.jpg", import.meta.url).href,
    skillCategory: "Mutation",
    id: "92",
  },
  "93": {
    name: "Running Pass",
    description:
      "If this Player makes a Quick pass, his activation does not end once the Pass is resolved.",
    icon: new URL("/icons/skills/93.jpg", import.meta.url).href,
    skillCategory: "Passing",
    id: "93",
  },
  "94": {
    name: "Cloud Burster",
    description:
      "When this Player tries a Long pass or a Long bomb, you can force the Reroll of a successful Interfere by the opposition Manager.",
    icon: new URL("/icons/skills/94.jpg", import.meta.url).href,
    skillCategory: "Passing",
    id: "94",
  },
  "95": {
    name: "Unknown Skill" + " 95",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "95",
  },
  "96": {
    name: "Brawler",
    description:
      "On a Block Declaration, but not on a Blitz, this Player can Re-roll one Both Down result.",
    icon: new URL("/icons/skills/96.jpg", import.meta.url).href,
    skillCategory: "Strength",
    id: "96",
  },
  "97": {
    name: "On the Ball",
    description:
      "This Player can move 3 Squares, whatever his MA and respecting Move rules, when there is a Declaration by the opposition Manager of a Pass action or use of the Dump-off Skill. This Skill can be used after the Kick-off by an Open player.",
    icon: new URL("/icons/skills/97.jpg", import.meta.url).href,
    skillCategory: "Passing",
    id: "97",
  },
  "98": {
    name: "Unknown Skill" + " 98",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "98",
  },
  "99": {
    name: "Unknown Skill" + " 99",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "99",
  },
  "100": {
    name: "Unknown Skill" + " 100",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "100",
  },
  "101": {
    name: "Unknown Skill" + " 101",
    description: "Unknown Description",
    icon: new URL("/icons/skills/unknown.jpg", import.meta.url).href,
    skillCategory: "Unknown Category",
    id: "101",
  },
  "102": {
    name: "Animosity",
    description:
      "Activated when this Player attempts a Hand-off or a Pass to a Square occupied by a Team-mate of the listed type. On a D6 result of 1, the action fails and the activation of this Player ends. Animosity does not target Star Players.",
    icon: new URL("/icons/skills/102.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
    id: "102",
  },
  "1005": {
    name: "Fumblerooskie",
    description:
      "When this Player performs a Move or Blitz action, and he is carrying the Ball, he can choose to abandon the Ball. The Ball can be placed in any of the Squares just vacated. The Ball does not bounce and there is no Turnover.",
    icon: new URL("/icons/skills/1005.jpg", import.meta.url).href,
    skillCategory: "Passing",
    id: "1005",
  },
  "1008": {
    name: "Loner",
    description:
      "If this Player wants to use a Team re-roll, roll a D6. If the result is equal to or greater than 3, this Player plays normally. On any other result, the first result is kept and the Team re-roll is lost. This Trait may still be used if the Player is Prone or has lost their Tackle Zone.",
    icon: new URL("/icons/skills/1008.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
    id: "1008",
  },
  "1010": {
    name: "Monstrous Mouth",
    description:
      "This Player can Re-roll each failed Catch. Moreover, the Strip Ball Skill cannot be used against this Player.",
    icon: new URL("/icons/skills/1010.jpg", import.meta.url).href,
    skillCategory: "Mutation",
    id: "1005",
  },
  "1012": {
    name: "Pile Driver",
    description:
      "When an opponent is Knocked down by this Player following a Block, this Player can attempt a free Foul action against the opponent if he is in an adjacent Square. This action ends the activation and places the Player Prone.",
    icon: new URL("/icons/skills/1012.jpg", import.meta.url).href,
    skillCategory: "Strength",
    id: "1012",
  },
  "1015": {
    name: "Safe Pair of Hands",
    description:
      "If this Player is Knocked down or becomes Prone while carrying the Ball, you may place the latter in an adjacent Square. This Skill may still be used if the Player is Prone.",
    icon: new URL("/icons/skills/1015.jpg", import.meta.url).href,
    skillCategory: "Agility",
    id: "1015",
  },
  "1016": {
    name: "Swarming",
    description:
      "At the start of a Drive, after the Kick-off, D3 Players with this Trait can be moved from the dugout onto the Pitch. The maximum number of players that can be moved corresponds to the number of players with this trait already on the pitch (the limit of 11 Players can be exceeded). They cannot be placed on the Line of Scrimmage or in a Wide Zone.",
    icon: new URL("/icons/skills/1016.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
    id: "1016",
  },
  "1020": {
    name: "Plague Ridden",
    description:
      "Once per Match, if an opponent with an ST of 4 or less, and without the Regeneration, Decay or Stunty Traits suffers a Dead result following a Block or Foul by this Player, a new Lineman is placed in the Reserves box.",
    icon: new URL("/icons/skills/1020.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
    id: "1020",
  },
};
