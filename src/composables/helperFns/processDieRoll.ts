import { PlayerId } from "@/types/IdTypes/PlayerId";
import { MatchData } from "@/types/MatchData";
import { Die } from "@/types/Pitch/Die";

export const processDieRoll = (opts: {
  dieRoll: Die;
  playerId: PlayerId;
  matchData: MatchData;
}) => {
  switch (opts.dieRoll.DieType) {
    case "0":
      // its a D6
      processD6Roll(opts.dieRoll, opts.playerId, opts.matchData);
      break;
    default:
      break;
  }
};

const processD6Roll = (
  dieRoll: Die,
  playerId: PlayerId,
  matchData: MatchData
) => {
  switch (dieRoll.Value) {
    case "1": {
      matchData.playerData[playerId].dSixRolls.one += 1;
      break;
    }
    case "2": {
      matchData.playerData[playerId].dSixRolls.two += 1;
      break;
    }
    case "3": {
      matchData.playerData[playerId].dSixRolls.three += 1;
      break;
    }
    case "4": {
      matchData.playerData[playerId].dSixRolls.four += 1;
      break;
    }
    case "5": {
      matchData.playerData[playerId].dSixRolls.five += 1;
      break;
    }
    case "6": {
      matchData.playerData[playerId].dSixRolls.six += 1;
      break;
    }
    default: {
      break;
    }
  }
};
