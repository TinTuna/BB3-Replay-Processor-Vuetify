import { Die } from "../Pitch/Die";
import { Modifier } from "../Pitch/Modifier";

export type ResultRoll = {
  Status: string;
  Requirement: string;
  Modifiers: {
    Modifier: Modifier[] | Modifier;
  };
  Dice: {
    Die: Die[] | Die;
  };
  Difficulty: string;
  RollType: string;
  Outcome: string;
  NewRoll: string;
};
