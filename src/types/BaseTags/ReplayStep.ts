import { Modifier } from "typescript";
import { Die } from "../Pitch/Die";
import { BoardState } from "../States/BoardState";
import { TeamInducement } from "../Inducements/TeamInducement";
import { XPos } from "../Pitch/xPos";
import { YPos } from "../Pitch/yPos";
import { GamePhase } from "../Pitch/GamePhase";
import { EndTurnTypes } from "../IdTypes/EndTurnTypes";
import { Step } from "../Match/Step";
import { PlayerId } from "../IdTypes/PlayerId";
import { SkillId } from "../IdTypes/SkillId";
import { KickoffIds } from "../IdTypes/KickoffIds";
import { PrayerIds } from "../IdTypes/PrayerIds";
import { EndTurnReasons } from "../IdTypes/EndTurnReasons";
import { EventNewInducementsTurn } from "../Inducements/EventNewInducementsTurn";
import { PlayerIdType } from "../IdTypes/PlayerIdTypes";

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
    Receive: undefined | "1";
    GamerId: undefined | "1";
  };
  EventSetupMovePitchPlayer: {
    NewPosition: {
      X: XPos;
      Y: YPos;
    };
    PlayerId: PlayerId;
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
    };
  }[];
  EventEndTurn: {
    Reason: EndTurnReasons;
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
  EventBuyMercenary: {
    GamerId: "0" | "1";
    MercenaryId: PlayerId;
    MercenaryType: PlayerIdType;
  };

  EventJourneyMen: [
    {
      TeamId: string;
    }
  ];
  EventMatchStart: {};
  EventNewInducementsTurn: EventNewInducementsTurn;
  EventPauseActiveTimer: {};
  EventWeatherRoll: {
    Dice: {
      Die: Die[];
    };
  };
  EventGamersAreReady: {};
  EventStartActiveTimer: {};
  EventEndInducements: {};
  EventQuestionKickingChoice: {
    GamerId: "0" | "1";
  };
  EventSetUpConfiguration: {
    SetUpValidity: {
      ScrimmageValid: "0" | "1";
      BotWideZoneValid: "0" | "1";
      PlayersNumberValid: "0" | "1";
      TopWideZoneValid: "0" | "1";
      ValidSetup: "0" | "1";
    };
    PlayersPositions: {
      SetUpPosition: {
        PlayerId: PlayerId;
        Position: {
          Y: YPos;
          X: XPos;
        };
      }[];
    };
  };
  EventKickOffTable: {
    Dice: {
      Die: Die[];
    };
    Event: KickoffIds;
  };
  EventCheeringFans: {
    RollOff: {
      Winner: string;
      Rolls: {
        ResultRoll: {
          Modifiers: {
            Modifier: Modifier;
          };
          Dice: {
            Die: Die;
          };
          RollType: string;
        }[];
      };
    };
  };
  EventPrayerTable: {
    TeamId: "0" | "1";
    Dice: {
      Die: Die;
    };
    Prayer: string;
  };
  EventQuestionIntensiveTraining: {
    GamerId: string;
    PlayerId: PlayerId;
    AvailableSkills: {
      AvailableSkillsItem: SkillId[];
    };
    Prayer: PrayerIds;
  };
  EventIntensiveTrainingSkill: {
    PlayerId: PlayerId;
    TeamId: "0" | "1";
    Skill: SkillId;
    Prayer: PrayerIds;
  };
  EventAddPlayerEffect: {
    PlayerId: PlayerId;
    Effect: {
      CharacModifiers: {};
      Durations: {
        DurationsItem: string;
      };
      ProviderType: string;
      ProviderId: string;
      EffectId: string;
      AdditionalSkills: {
        AdditionalSkillsItem: SkillId;
      };
    };
  };
  EventMatchEnd: {
    MatchCompletionStatus: "0" | "1";
    GamersEndMatchStatus: {
      GamerEndMatchStatus: {
        EndStatus?: "0" | "1";
        GamerId?: "0" | "1";
      }[];
    };
  };
};

/* 

<EventMatchEnd>
  <MatchCompletionStatus>1</MatchCompletionStatus>
  <GamersEndMatchStatus>
    <GamerEndMatchStatus>
      <EndStatus>1</EndStatus>
    </GamerEndMatchStatus>
    <GamerEndMatchStatus>
      <GamerId>1</GamerId>
    </GamerEndMatchStatus>
  </GamersEndMatchStatus>
</EventMatchEnd>

*/
