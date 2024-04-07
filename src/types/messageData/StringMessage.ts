export type StringMessage = {
  Name:
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
    | "ResultTeamRerollUsage"
    | "QuestionBribeUsage"
    | "ResultPlayerSentOff";

  MessageData: string; // This is stringified XML
};
