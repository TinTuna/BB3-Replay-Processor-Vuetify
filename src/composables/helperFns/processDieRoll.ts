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
    case "2":
      // its a block die
      processBlockDieRoll(opts.dieRoll, opts.playerId, opts.matchData);
      break;
    case "4":
      // its a 2d6 roll (values 2-12, used for injury table, prayers, etc)
      process2D6Roll(opts.dieRoll, opts.playerId, opts.matchData);
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

const processBlockDieRoll = (
  dieRoll: Die,
  playerId: PlayerId,
  matchData: MatchData
) => {
  switch (dieRoll.Value) {
    case "1": {
      // Attacker Down
      matchData.playerData[playerId].blockDiceRolled.attackerDown += 1;
      break;
    }
    case "2": {
      // Both Down
      matchData.playerData[playerId].blockDiceRolled.bothDown += 1;
      break;
    }
    case "3": {
      // Push
      matchData.playerData[playerId].blockDiceRolled.push += 1;
      break;
    }
    case "4": {
      // Push (another type)
      matchData.playerData[playerId].blockDiceRolled.push += 1;
      break;
    }
    case "5": {
      // Defender Stumbles
      matchData.playerData[playerId].blockDiceRolled.defenderStumbles += 1;
      break;
    }
    case "6": {
      // Defender Down
      matchData.playerData[playerId].blockDiceRolled.defenderDown += 1;
      break;
    }
    default: {
      break;
    }
  }
};

const process2D6Roll = (
  dieRoll: Die,
  playerId: PlayerId,
  matchData: MatchData
) => {
  // 2d6 rolls produce values from 2-12 (or potentially higher for prayers)
  // These are typically used for injury rolls, prayers, etc.
  // Currently we don't have a specific storage structure for these individual values
  // They are tracked as part of the specific roll type (armourRolls, injuryRolls, etc.)
  // So for now, this is a placeholder for future expansion
};
