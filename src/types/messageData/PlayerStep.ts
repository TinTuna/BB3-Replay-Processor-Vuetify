import { PlayerId } from "../IdTypes/PlayerId";
import { SkillId } from "../IdTypes/SkillId";
import { StepType } from "../IdTypes/StepType";
import { XPos } from "../Pitch/xPos";
import { YPos } from "../Pitch/yPos";

export type PlayerStep = {
  CellFrom: {
    X: XPos;
    Y: YPos;
  };
  CellTo: {
    X: XPos;
    Y: YPos;
  };
  PlayerId: PlayerId;
  Probability: string;
  Skill: SkillId;
  State: string;
  StepType: StepType;
  TargetId: PlayerId;
};
