import { PlayerId } from "../IdTypes/PlayerId";
import { SkillId } from "../IdTypes/SkillId";
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
      PlayerId: PlayerId;
      Skill: SkillId;
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