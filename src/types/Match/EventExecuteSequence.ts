import { Step } from "./Step";

export type EventExecuteSequenceProcessed = {
  Sequence: {
    StepResult: Step[];
  }[];
};
