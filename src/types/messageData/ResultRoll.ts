import { Die } from "../Pitch/Die";

export type ResultRoll = {
  Status: string;
  Requirement: string;
  Modifiers: string;
  Dice: {
    Die: Die;
  };
  Difficulty: string;
  RollType: string;
  Outcome: string;
  NewRoll: string;
};