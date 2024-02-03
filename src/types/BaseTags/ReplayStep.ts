import { Modifier } from "typescript";
import { Die } from "../Pitch/Die";
import { BoardState } from "../States/BoardState";
import { TeamInducement } from "../Teams/TeamInducement";

export type ReplayStep = {
  BoardState: BoardState;
  Clock: string;
  EventActiveGamerChanged: { NewActiveGamer: string };
  EventActiveTimerChanged: {
    NewTimer: {
      Duration: string;
      Team: string;
      Type: string;
      Value: string;
    };
    IsPaused: string;
  };
  EventFanFactor: {
    HomeRoll: {
      Dice: {
        Die: Die;
      };
      Modifiers: {
        Modifier: Modifier;
      };
      Outcome: string;
      RollType: string;
    };
    AwayRoll: {
      Dice: {
        Die: Die;
      };
      Modifiers: {
        Modifier: Modifier;
      };
      Outcome: string;
      RollType: string;
    };
  };
  EventInducementsData: {
    TeamInducements: {
      TeamInducements: TeamInducement[];
    };
  };
  EventJourneyMen: [
    {
      TeamId: string;
    }
  ];
  EventMatchStart: {};
  EventNewInducementsTurn: {
    GamerId: string;
    InducementsPhase: string;
  };
  EventPauseActiveTimer: {};
  EventWeatherRoll: {
    Dice: {
      Die: Die[];
    };
  };
};
