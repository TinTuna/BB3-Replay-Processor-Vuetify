import { Ball } from "../Pitch/Ball";
import { Bomb } from "../Pitch/Bomb";
import { Die } from "../Pitch/Die";
import { PitchZone } from "../Pitch/PitchZone";
import { TeamState } from "./TeamState";

export type BoardState = {
  ActiveGamer: string;
  ActivePlayer: string;
  ActiveTeam: string;
  ActiveTimer: {
    Duration: string;
    Type: string;
    Value: string;
    Team: string;
  };
  Ball: Ball;
  Bomb: Bomb;
  CurrentSequenceTarget: string;
  Effects: {};
  InducementsPhase: string;
  KickOffTeam: string;
  LastKickOffEvent: string;
  LastKickOffEventRoll: {};
  LastWeatherRoll: {
    Die: Die[];
  };
  ListTeams: {
    TeamState: TeamState[];
  };
  PitchType: string;
  PitchZones: {
    PitchZone: PitchZone[];
  };
  SpecialCardsInducements: {
    TeamSpecialCardsChoice: [{}];
  };
  TimerSettings: {
    TimerPoolConfiguration: [
      {
        Duration: string;
        Pool: string;
      }
    ];
  };
};
