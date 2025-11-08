import { Die } from "../Pitch/Die";
import { RollType } from "../IdTypes/RollTypes";

export type QuestionApothecaryCasualtyUsage = {
  GamerId: "0" | "1";
  RollInfos: {
    Status: string;
    Modifiers: {
      Modifier?: {
        PlayerId: string;
        Skill: string;
        Effect: string;
        Value: string;
        ModifierType: string;
      }[];
    };
    Dice: {
      Die: Die[] | Die;
    };
    Source: string;
    RollType: RollType;
    Outcome: string;
  };
};
