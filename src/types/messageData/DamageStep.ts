import { PlayerId } from "../IdTypes/PlayerId";
import { SkillId } from "../IdTypes/SkillId";
import { XPos } from "../Pitch/xPos";
import { YPos } from "../Pitch/yPos";

export type DamageStep = {
  Applied: number;
  Probability: number;
  Source: number;
  PlayerId: PlayerId;
  TargetId: PlayerId;
  StepType: number;
  CellTo: {
    Y: YPos;
    X: XPos;
  };
  State: number;
  CellFrom: {
    Y: YPos;
    X: XPos;
  };
  Skill: SkillId;
};
