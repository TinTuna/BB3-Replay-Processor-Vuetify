import { PlayerId } from "./IdTypes/PlayerId";
import { Turn } from "./Match/Turn";
import { Player } from "./Teams/Player";

export type MatchData = {
  matchLog: Turn[];
  fanFactor?: {
    home: string;
    away: string;
  };
  weather?: {
    fistHalf: number;
    secondHalf: number;
  };
  kickoff?: {
    firstHalfKick: 0 | 1; // 0 = home, 1 = away
    secondHalfKick: 0 | 1; // 0 = home, 1 = away
  };
  inducements: {
    homeTeam: {
      cheerleaders?: number; // 0-4
      assistantCoaches?: number; // 0-3
      weatherMage?: number; // 0-1
      bloodweiserKeg?: number; // 0-2
      specialPlays?: number; // 0-5
      extraTraining?: number; // 0-8
      bribes?: number; // 0-3
      wanderingApothecary?: number; // 0-2
      mortuaryAssistant?: number; // 0-1
      plagueDoctor?: number; // 0-1
      riotousRookies?: number; // 0-1
      halflingMasterChef?: number; // 0-1
      infamousCoachingStaff?: number; // 0-2
      wizard?: number; // 0-1
      biasedReferee?: number; // 0-1
      mercenaryPlayers?: Player[];
      starPlayers?: Player[];
    };
    awayTeam: {
      cheerleaders?: number; // 0-4
      assistantCoaches?: number; // 0-3
      weatherMage?: number; // 0-1
      bloodweiserKeg?: number; // 0-2
      specialPlays?: number; // 0-5
      extraTraining?: number; // 0-8
      bribes?: number; // 0-3
      wanderingApothecary?: number; // 0-2
      mortuaryAssistant?: number; // 0-1
      plagueDoctor?: number; // 0-1
      riotousRookies?: number; // 0-1
      halflingMasterChef?: number; // 0-1
      infamousCoachingStaff?: number; // 0-2
      wizard?: number; // 0-1
      biasedReferee?: number; // 0-1
      mercenaryPlayers?: Player[];
      starPlayers?: Player[];
    };
  };
  playerData: {
    [key: string]: {
      playerId: PlayerId;
      teamId: string;
      yardsMoved: number;
      yardsMovedWithBall: number;
      passesAttempted: {
        handoff: number;
        short: number;
        long: number;
        longBomb: number;
      };
      passesCompleted: {
        handoff: number;
        short: number;
        long: number;
        longBomb: number;
      };
      passesCaught: number;
      passesDropped: number;
      passesIntercepted: number;
      blocksAttempted: number;
      blockDiceRolled: {
        attackerDown: number;
        bothDown: number;
        push: number;
        defenderStumbles: number;
        defenderDown: number;
      };
      blockDiceTaken: {
        attackerDown: number;
        bothDown: number;
        push: number;
        defenderStumbles: number;
        defenderDown: number;
      };
      blockingRerollsUsed: {
        team: number;
        pro: number;
        brawler: number;
      };
      assistsReceived: number;
      pushFollowUps: number;
      // receiving blocks
      timesPushed: number;
      timesRemovedFromPlay: number;
      dSixRolls: {
        one: number;
        two: number;
        three: number;
        four: number;
        five: number;
        six: number;
      };
      armourRolls: {
        armourRolls: number;
        armourRollsPassed: number;
        armourRollsFailed: number;
      };
      injuryRolls: {
        injuryRolls: number;
        injuryStunned: number;
        injuryKO: number;
        injuryCasualty: number;
      };
    };
  };
};
