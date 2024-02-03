import { AggregatedStatistic } from "../Statistics/AggregatedStatistic";
import { DiceStatistic } from "../Statistics/DiceStatistic";
import { Player } from "../Teams/Player";

export type PlayerResult = {
  Mvp: string;
  PlayerData: Player;
  SppGained: string
  Statistics: {
    AggregatedStatistics: {
        AggregatedStatistic: AggregatedStatistic[];
    };
    DiceStatistics: {
        DiceStatistic: DiceStatistic[];
    };
  };
};
