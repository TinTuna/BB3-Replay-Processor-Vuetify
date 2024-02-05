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
  PlayerId: string;
  Probability: string;
  Skill: string;
  State: string;
  StepType: string;
  TargetId: string;
};
