import { Die } from "../Pitch/Die";
import { XPos } from "../Pitch/xPos";
import { YPos } from "../Pitch/yPos";

export type QuestionPushBack = {
  GamerId: string;
  CellTo: {
    Cell: {
      Y: YPos;
      X: XPos;
    }[];
  };
  CellFrom: {
    Y: YPos;
    X: XPos;
  };
  BlockRoll: {
    RollStatus: string;
    StModifiers: {
      Modifier: {
        PlayerId: string;
        Skill: string;
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
};