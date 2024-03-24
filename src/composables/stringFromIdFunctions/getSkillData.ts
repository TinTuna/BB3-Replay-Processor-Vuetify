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
    name: "Always Hungry",
    description: "During an attempt to Throw Team-Mate, on a D6 result of 1: the Throw Team-Mate fails and the Player tries to eat his Team-mate. Attempt at eating: on a D6 result of 1, the Team-mate is Dead without possibility of an Apothecary.",
    icon: new URL("/icons/skills/18.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
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
    name: "Take Root",
    description: "When this Player is activated, after Declaration of his action, a D6 is rolled. On a roll of 1, this Player cannot move from the Square he occupies until he is Prone or Knocked down or the Drive ends. He may perform any valid action that does not include a Move.",
    icon: new URL("/icons/skills/20.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
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
    name: "Chainsaw",
    description: "This action can replace a lone Block action or one that is part of a Blitz or a Foul. On a D6 result of 1: the Player injures himself. On other results, the target is hit. In all cases, an Armour Value test is made. All Armour Value tests caused by, or suffered by, the Chainsaw carrier have a +3 modifier.",
    icon: new URL("/icons/skills/25.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
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
    name: "Dirty Player (+1)",
    description:
      "During a Foul action performed by this Player, the result of the Armour Value or the Injury test can be modified by +1.",
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
    name: "Bone Head",
    description: "On the activation of this Player, on a D6 result of 1: the Turn of this Player ends, and he loses his Tackle Zone. If this player was attempting a Declaration that was usable only once per Turn, it is lost.",
    icon: new URL("/icons/skills/31.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
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
    name: "No Hands",
    description: "This Player cannot take possession of the Ball nor attempt any action that would lead him to take possession of the Ball.",
    icon: new URL("/icons/skills/46.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
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
    name: "Loner (4+)",
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
    name: "Really Stupid",
    description: "When this Player is activated, roll a D6:<br/>1-3: the Turn of this Player ends and he loses his Tackle Zone. If this Player was attempting an action usable once per Turn, it is consumed.<br/>4+: play normally.<br/>The roll is made with a +2 bonus if, at least, one Team-mate without this Trait is adjacent.",
    icon: new URL("/icons/skills/51.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
    id: "51",
  },
  "52": {
    name: "Right Stuff",
    description: "If this Player has an ST of 3 or less, he can be thrown by a Team-mate with the Throw Team-Mate Skill. This Trait may still be used if the Player is Prone, Stunned or has lost their Tackle Zone.",
    icon: new URL("/icons/skills/52.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
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
    name: "Secret Weapon",
    description:
      "When a Drive involving this Player comes to an end, he is Sent off for having committed a Foul.",
    icon: new URL("/icons/skills/54.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
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
    name: "Throw Team-Mate",
    description: "If this Player has an ST of 5 or more, he can attempt a Throw Team-Mate action on a Team-mate with the Right Stuff Skill.",
    icon: new URL("/icons/skills/64.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
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
    name: "Unchanneled Fury",
    description: "When this player is activated, even if they are Prone or have lost their Tackle Zone, immediately after declaring the action they will perform but before performing the action, roll a D6, applying a +2 modifier to the dice roll if you declared the player would perform a Block or Blitz action (or a Special action granted by a Skill or Trait that can be performed instead of a Block action):<br/>- On a roll of 1-3, the action isn't performed and the player's activation ends immediately. If you declared that this player would perform an action which can only be performed once per team, the action is considered to have been performed and no other player on your team may perform the same action this team turn.<br/>- On a roll of 4+, this player continues their activation as normal and completes their declared action.",
    icon: new URL("/icons/skills/67.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
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
    name: "Ball and Chain",
    description: "A Player with this Skill can only perform this action during his activation. This action imposes a special Move on the Player, forbidding him to carry or pick up the Ball. If this player enters a Square occupied by any other Standing Player, he must resolve a Block action. This Skill may still be used if the Player is Prone or has lost their Tackle Zone.",
    icon: new URL("/icons/skills/76.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
    id: "76",
  },
  "77": {
    name: "Stab",
    description: "Stab can replace the Block action (including during a Blitz without moving after using it). An Armour Value test is made against the target. If the test is successful, the target becomes Prone and an Injury test without any modifier is made. Several Players can use this Skill during the same Turn.",
    icon: new URL("/icons/skills/77.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
    id: "77",
  },
  "78": {
    name: "Hypnotic Gaze",
    description: "Target an opponent who is Standing adjacent and who has not lost his Tackle Zone. This Player carries out an Agility test with -1 for each Player Marking him. If the test is successful, the opponent loses his Tackle Zone until his activation.",
    icon: new URL("/icons/skills/78.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
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
    name: "Bombardier",
    description: "This Player can throw a bomb during his activation if he is already Standing and he has not yet moved. It does not use up the Pass Declaration for this Turn, and works like a Pass. The bomb explodes in the Square where it is if the throw fails, if it is not caught by a player or, on a roll of 4+, when it is caught. Any standing Players hit by the explosion are placed Prone. On a roll of 1-3, after it has been caught, the Player must throw the bomb.",
    icon: new URL("/icons/skills/80.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
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
    name: "Titchy",
    description: "+1 on Agility tests during a Dodge. However, if an opponent dodges into the Tackle Zone of this Player, it does not count towards Agility tests.",
    icon: new URL("/icons/skills/83.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
    id: "83",
  },
  "84": {
    name: "Animal Savagery",
    description: "After declaring an action, on a D6 result of 1-3 (with +2 if the declared action is a Blitz): an adjacent Team-mate is Knocked down. Only causes a Turnover if the victim was carrying the Ball. During an Armour Value test, the opposition Manager can use the Mighty Blow Skill if your Player has it. The Turn of the Player stops immediately if no Team-mate is adjacent. This Player loses his Tackle Zone until next activated.",
    icon: new URL("/icons/skills/84.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
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
    name: "Animosity: All Team-Mates",
    description: "Activated when this Player attempts a Hand-off or a Pass to a Square occupied by any Team-mate. On a D6 result of 1, the action fails and the activation of this Player ends. Animosity does not target Star Players.",
    icon: new URL("/icons/skills/86.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
    id: "86",
  },
  "87": {
    name: "Timmm-ber!",
    description: "If this Player has an MA of 2 or less, he gains +1 in Stand up tests for each adjacent Team-mate. A natural roll of 1 is always a failure. This Trait may still be used if the Player is Prone or has lost their Tackle Zone.",
    icon: new URL("/icons/skills/87.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
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
    name: "Projectile Vomit",
    description: "Replaces Block. Target an adjacent Standing Player and roll a D6:<br/>1: the Player is covered in his own vomit.<br/>2+: the target is covered.<br/>In all cases, make an Armour Value test without modifier on the victim. If successful, the target is Prone and undergoes an Injury test.<br/>Usable only once per Turn. Incompatible with Frenzy and Multiple Block.",
    icon: new URL("/icons/skills/95.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
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
    name: "Animosity: Dwarf and Halfling Team-Mates",
    description: "Activated when this Player attempts a Hand-off or a Pass to a Square occupied by a Dwarf or Halfling Team-mate. On a D6 result of 1, the action fails and the activation of this Player ends. Animosity does not target Star Players.",
    icon: new URL("/icons/skills/98.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
    id: "98",
  },
  "99": {
    name: "Animosity: Dwarf and Human Team-Mates",
    description: "Activated when this Player attempts a Hand-off or a Pass to a Square occupied by a Dwarf or Human Team-mate. On a D6 result of 1, the action fails and the activation of this Player ends. Animosity does not target Star Players.",
    icon: new URL("/icons/skills/99.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
    id: "99",
  },
  "100": {
    name: "Animosity: Orc Lineman",
    description: "Activated when this Player attempts a Hand-off or a Pass to a Square occupied by an Orc Lineman Team-mate. On a D6 result of 1, the action fails and the activation of this Player ends. Animosity does not target Star Players.",
    icon: new URL("/icons/skills/100.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
    id: "100",
  },
  "101": {
    name: "Animosity: Big Un Blocker",
    description: "Activated when this Player attempts a Hand-off or a Pass to a Square occupied by a Big Un Blocker Team-mate. On a D6 result of 1, the action fails and the activation of this Player ends. Animosity does not target Star Players.",
    icon: new URL("/icons/skills/101.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
    id: "101",
  },
  "102": {
    name: "Animosity: Underworld Goblin Lineman",
    description:
      "Activated when this Player attempts a Hand-off or a Pass to a Square occupied by an Underworld Goblin Lineman Team-mate. On a D6 result of 1, the action fails and the activation of this Player ends. Animosity does not target Star Players.",
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
    name: "Loner (3+)",
    description:
      "If this Player wants to use a Team re-roll, roll a D6. If the result is equal to or greater than 3, this Player plays normally. On any other result, the first result is kept and the Team re-roll is lost. This Trait may still be used if the Player is Prone or has lost their Tackle Zone.",
    icon: new URL("/icons/skills/1008.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
    id: "1008",
  },
  "1009": {
    name: "Mighty Blow (+2)",
    description:
      "When an opponent is Knocked down following a Block by this Player, you can change the Armour Value or Injury test by +2. This modifier can be applied after the test. This Skill is not usable with Stab or Chainsaw.",
    icon: new URL("/icons/skills/1009.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
    id: "1005",
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
  "1021": {
    name: "Dirty Player (+2)",
    description: "During a Foul action performed by this Player, the result of the Armour Value or the Injury test can be modified by +2.",
    icon: new URL("/icons/skills/1021.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
    id: "1021",
  },
  "1022": {
    name: "Loner (5+)",
    description: "If this Player wants to use a Team re-roll, roll a D6. If the result is equal to or greater than 5, this Player plays normally. On any other result, the first result is kept and the Team re-roll is lost. This Trait may still be used if the Player is Prone or has lost their Tackle Zone.",
    icon: new URL("/icons/skills/1022.jpg", import.meta.url).href,
    skillCategory: "Trait Skill",
    id: "1022",
  },
};
