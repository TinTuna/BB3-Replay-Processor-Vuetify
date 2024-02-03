import { Roster } from "./BaseTags/Roster";

export type GamerInfo = {
  CompetitionParticipant: {
    Division: string;
    Draw: string;
    Loss: string;
    Ranking: string;
    Rating: string;
    Win: string;
  };
  GamerId: string;
  IsAI: string;
  Name: string;
  PauseUsed: string;
  Roster: Roster;
  Slot: string;
};
