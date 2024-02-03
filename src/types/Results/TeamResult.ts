import { AggregatedStatistic } from "../Statistics/AggregatedStatistic";
import { DiceStatistic } from "../Statistics/DiceStatistic";
import { Team } from "../Teams/Team";
import { PlayerResult } from "./PlayerResult";

export type TeamResult = {
  CashEarned: string;
  DedicatedFansRoll: {
    DedicatedFansRollItem: string;
  };
  FanAttendance: string;
  NewDedicatedFans: string;
  NewTreasury: string;
  PlayerResults: {
    PlayerResult: PlayerResult[];
  };
  Statistics: {
    AggregatedStatistics: {
        AggregatedStatistic: AggregatedStatistic[];
    }
    ;
    DiceStatistics: {
        DieStatistic: DiceStatistic[];
    };
  };
  TeamData: Team;
  TouchdownsBeforeConcede: string;
};
