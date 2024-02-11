import { PlayerId } from "../IdTypes/PlayerId";
import { SkillId } from "../IdTypes/SkillId";
import { Die } from "../Pitch/Die";
import { XPos } from "../Pitch/xPos";
import { YPos } from "../Pitch/yPos";

export type ResultBlockRoll = {
  RollStatus: string;
  StModifiers: {
    Modifier: {
      PlayerId: PlayerId;
      Skill: SkillId;
      Effect: string;
      Value: string;
      ModifierType: string;
    }[];
  };
  Die: Die;
  Assists: {
    AssistInfos: {
      Cell: {
        Y: YPos;
        X: XPos;
      };
      Modifier: string;
    }[];
  };
  RollType: string;
  Outcome: string;
  NewRoll: string;
};