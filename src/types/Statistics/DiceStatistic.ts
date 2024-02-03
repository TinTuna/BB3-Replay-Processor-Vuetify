import { RollType } from "../IdTypes/RollTypes";
import { Die } from "../Pitch/Die";

export type DiceStatistic = {
  Dice: {
    Die: Die[];
  };
  Outcome: string;
  Requirement: string;
  RollType: RollType;
};
