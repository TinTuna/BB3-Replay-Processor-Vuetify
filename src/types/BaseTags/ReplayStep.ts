import { Modifier } from "typescript";
import { Die } from "../Pitch/Die";
import { BoardState } from "../States/BoardState";
import { TeamInducement } from "../Teams/TeamInducement";
import { XPos } from "../Pitch/xPos";
import { YPos } from "../Pitch/yPos";
import { GamePhase } from "../Pitch/GamePhase";
import { EndTurnTypes } from "../IdTypes/EndTurnTypes";
import { Step } from "../Match/Step";

export type ReplayStep = {
  BoardState: BoardState;
  Clock: string;
  EventNewGamePhase: {
    Phase: GamePhase;
  };
  EventRulesEngineStandBy: {
    Phase: string;
    ActiveGamer: "0" | "1";
  };
  EventKickingChoice: {
    Receive: "0" | "1";
    Kick: "0" | "1";
  };
  EventSetupMovePitchPlayer: {
    NewPosition: {
      X: XPos;
      Y: YPos;
    };
    PlayerId: string;
    SetUpValidity: {
      BotWideZoneValid: "0" | "1";
      PlayersNumberValid: "0" | "1";
      ScrimmageValid: "0" | "1";
      TopWideZoneValid: "0" | "1";
      ValidSetup: "0" | "1";
    };
  };
  EventActiveGamerChanged: {
    NewActiveGamer: "0" | "1";
  };
  EventActiveTimerChanged: {
    NewTimer: {
      Duration: string;
      Team: string;
      Type: string;
      Value: string;
    };
    IsPaused: string;
  };
  EventExecuteSequence: {
    Sequence: {
      StepResult: Step[];
    }
  }
  EventEndTurn: {
    Reason: string;
    FinishingTurnType: EndTurnTypes;
    NextPlayingGamer: "0" | "1";
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
