import { PlayerId } from "../IdTypes/PlayerId";
import { RollType } from "../IdTypes/RollTypes";
import { SkillId } from "../IdTypes/SkillId";
import { Die } from "../Pitch/Die";

export type ResultInjuryRoll = {
  Status: string;
  Modifiers: {
    Modifier: {
      PlayerId: PlayerId;
      Skill: SkillId;
      Effect: string;
      Value: string;
      ModifierType: string;
    }[];
  };
  Dice: {
    Die: Die[];
  };
  Source: string;
  RollType: RollType;
  Outcome: string;
};