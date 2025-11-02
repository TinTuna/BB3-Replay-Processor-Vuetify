import { Step } from "@/types/Match/Step";
import { xmlToJsonMemoized } from "../helperFns/xmlToJsonMemoized";
import { ReplayStep } from "@/types/BaseTags/ReplayStep";
import { MatchData } from "@/types/MatchData";
import { PlayerId } from "@/types/IdTypes/PlayerId";
import { Turn } from "@/types/Match/Turn";
import { StepResult } from "@/types/Match/StepResult";
import { TurnAction } from "@/types/Match/TurnAction";
import { ResultBlockOutcome } from "@/types/messageData/ResultBlockOutcome";
import { ResultPlayerRemoval } from "@/types/messageData/ResultPlayerRemoval";
import { StepStep } from "@/types/messageData/StepStep";

export const processStep = (opts: {
  stepResult: Step;
  step: ReplayStep;
  matchData: MatchData;
  currentTurn: Turn;
  currentTurnAction: TurnAction;
  nextTurnAction: TurnAction;
  hasBall: string | undefined;
}) => {
  // Currently not implemented - Step processing is minimal
  // Most step data is handled in PlayerStep and DamageStep processors
  // TODO: Implement if Step-specific processing is needed (ball scatter, etc.)
  return opts;
};
