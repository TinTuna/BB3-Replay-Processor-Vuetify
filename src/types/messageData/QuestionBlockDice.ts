import { Die } from "../Pitch/Die";
import { XPos } from "../Pitch/xPos";
import { YPos } from "../Pitch/yPos";

export type QuestionBlockDice = {
  CanUseBrawlerReroll: string;
  Dice: {
    Die: Die[] | Die;
  };
  StModifiers: {
    Modifier: {
      PlayerId: string;
      Skill: string;
      Effect: string;
      Value: string;
      ModifierType: string;
    }[];
  };
  CanChoseDie: string;
  GamerId: string;
  CanUseProReroll: string;
  DiceOutcomes: {
    DiceOutcomesItem: string[];
  };
  CanUseTeamReroll: string;
  Assists: {
    AssistInfos: {
      Cell: {
        Y: YPos;
        X: XPos;
      };
      Modifier: string;
    }[];
  };
  AttackerChoice: "1" | "0" | undefined;
  RollType: string;
  RollStatus: string;
};