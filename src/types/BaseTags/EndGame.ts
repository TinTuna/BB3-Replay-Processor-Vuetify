import { GamerResult } from "../Results/GamerResult";
import { BoardState } from "../States/BoardState";
import { AggregatedStatistic } from "../Statistics/AggregatedStatistic";
import { DiceStatistic } from "../Statistics/DiceStatistic";

export type EndGame = {
  BoardState: BoardState;
  Clock: string;
  RulesEventGameFinished: {
    MatchResult: {
      FanAttendance: string;
      GamerResults: {
        GamerResult: GamerResult[];
      };
      Session: string;
      Statistics: {
        AggregatedStatistics: AggregatedStatistic[];
        DiceStatistics: DiceStatistic[];
      };
      UseLobbyTeams: string;
    };
  };
};
