import { PlayerState } from "./PlayerState";

export type TeamState = {
  BlitzAvailable: string;
  BlitzNb: string;
  CurrentTeamValue: string;
  Data: {
    LobbyId: string;
    IdRace: string;
    DedicatedFans: string;
    Value: string;
    Treasury: string;
  };
  Effects: {};
  FanFactor: string;
  FoulAvailable: string;
  FoulNb: string;
  HandOffAvailable: string;
  HandOffNb: string;
  ListInducements: {};
  ListMercenaries: {};
  ListPitchPlayers: {
    PlayerState: PlayerState[];
  };
  PassAvailable: string;
  PassNb: string;
  PettyCash: string;
  PreviousTouchdowns: string;
  RemainingPauses: string;
  RerollNumber: string;
  Side: string;
  SidelineStaff: {
    Staff: [
      {
        StaffType: string;
      }
    ];
  };
  SpecialCards: {};
  Timers: {
    RulesTimer: [
      {
        Duration: string;
        Type: string;
        Value: string;
      }
    ];
  };
  TransformedPlayers: {};
  Treasury: string;
  Wizards: {};
};
