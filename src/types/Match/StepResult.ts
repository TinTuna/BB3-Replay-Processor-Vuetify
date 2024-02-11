export type StepResult = {
  actionName:
    | "ResultUseAction"
    | "ResultDoMove"
    | "ResultMoveOutcome"
    | "QuestionBlockDice"
    | "QuestionPushBack"
    | "QuestionFollowUp"
    | "ResultBlockRoll"
    | "ResultPushBack"
    | "ResultFollowUp"
    | "ResultBlockOutcome"
    | "ResultRoll"
    | "ResultSkillUsage"
    | "ResultInjuryRoll"
    | "ResultCasualtyRoll"
    | "ResultPlayerRemoval"
    | "ResultTeamRerollUsage";
  messageData: string; // This is stringified XML
  actionString: string;
};
