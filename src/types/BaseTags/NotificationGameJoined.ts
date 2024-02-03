import { Ball } from "../Pitch/Ball";
import { Bomb } from "../Pitch/Bomb";
import { GamerInfo } from "../GamerInfo";
import { PitchZone } from "../Pitch/PitchZone";

export type NotificationGameJoined = {
  FullStates: string;
  GameInfos: {
    ChallengeId: string;
    Clock: string;
    Competition: {
      CompetitionInfos: {
        CampaignNodeId: string;
        CreatorGamerId: string;
        Format: string;
        Id: string;
        IsCampaign: string;
        IsOfficial: string;
        Logo: string;
        MatchId: string;
        Name: string;
      };
    };
    Customization: {
      Ball: string;
      GrandStand: string;
      Pitch: string;
    };
    GameOptions: {
      AwayNbPause: string;
      AwaySerieTds: string;
      ClientMaxReconnections: string;
      ClientMaxTimeDelayed: string;
      ClientMaxTimeUnresponsive: string;
      DirectReportToLobby: string;
      HomeNbPause: string;
      HomeSerieTds: string;
      PitchRuleId: string;
      RulesOptions: string;
      ServerDelayDetectionThreshold: string;
      ServerReconnectionAllowedTime: string;
      Timer: {
        TimerPoolConfiguration: [
          {
            Duration: string;
            Pool: string;
          }
        ];
      };
    };
    GamersInfos: {
      GamerInfos: GamerInfo[];
    };
    Id: string;
    IsPaused: string;
    LocalGamerSlot: string;
    Mode: string;
    State: string;
  };
  IdSession: string; // unsure of this type
  InitialBoardState: {
    ActivePlayer: string;
    ActivePrayers: {};
    ActiveTimer: {
      Duration: string;
      Team: string;
      Type: string;
      Value: string;
    };
    Ball: Ball;
    Bomb: Bomb;
    CurrentPhase: string;
    CurrentSequenceTarget: string;
    CurrentSequenceType: string;
    Effects: {};
    InducementsPhase: string;
    IsPaused: string;
    KickOffTeam: string;
    LastKickOffEvent: string;
    LastKickOffEventRoll: {};
    LastWeatherRoll: {};
    ListSecretWeapons: {};
    ListTeams: {};
    Period: string;
    PeriodTurnDuration: string;
    PitchFace: string;
    PitchType: string;
    PitchZones: {
      PitchZone: PitchZone[];
    };
    RemovedWeather: string;
    SpecialCardsDrawn: {};
    SpecialCardsInducements: {
      TeamSpecialCardsChoice: [
        {
          CurrentChoice: {};
          NbSpecialCardsChosen: string;
          NbSpecialCardsToChose: string;
        }
      ];
    };
    StadiumStructure: {};
    Statistics: {
      AggregatedStatistics: {};
      DiceStatistics: {};
    };
    TimerSettings: {
      TimerPoolConfiguration: [
        {
          Duration: string;
          Pool: string;
        }
      ];
    };
    Weather: string;
  };
  IsSpectating: string; // 0 - not spectating, 1 - spectating
};
