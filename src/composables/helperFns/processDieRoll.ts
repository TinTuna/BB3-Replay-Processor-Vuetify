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
      // its a 1d12 roll (values 1-12, used for injury table, prayers, etc)
      process1D12Roll(opts.dieRoll, opts.playerId, opts.matchData);
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
    case "0": {
      // Attacker Down
      matchData.playerData[playerId].blockDiceRolled.attackerDown += 1;
      break;
    }
    case "1": {
      // Both Down
      matchData.playerData[playerId].blockDiceRolled.bothDown += 1;
      break;
    }
    case "2": {
      // Push
      matchData.playerData[playerId].blockDiceRolled.push += 1;
      break;
    }
    case "3": {
      // Defender Stumbles
      matchData.playerData[playerId].blockDiceRolled.defenderStumbles += 1;
      break;
    }
    case "4": {
      // Defender Down (Pow)
      matchData.playerData[playerId].blockDiceRolled.defenderDown += 1;
      break;
    }
    default: {
      console.log("unknown case in processBlockDieRoll", dieRoll.Value);
      break;
    }
  }
};

const process1D12Roll = (
  dieRoll: Die,
  playerId: PlayerId,
  matchData: MatchData
) => {
  switch (dieRoll.Value) {
    case "1": {
      matchData.playerData[playerId].dTwelveRolls.one += 1;
      break;
    }
    case "2": {
      matchData.playerData[playerId].dTwelveRolls.two += 1;
      break;
    }
    case "3": {
      matchData.playerData[playerId].dTwelveRolls.three += 1;
      break;
    }
    case "4": {
      matchData.playerData[playerId].dTwelveRolls.four += 1;
      break;
    }
    case "5": {
      matchData.playerData[playerId].dTwelveRolls.five += 1;
      break;
    }
    case "6": {
      matchData.playerData[playerId].dTwelveRolls.six += 1;
      break;
    }
    case "7": {
      matchData.playerData[playerId].dTwelveRolls.seven += 1;
      break;
    }
    case "8": {
      matchData.playerData[playerId].dTwelveRolls.eight += 1;
      break;
    }
    case "9": {
      matchData.playerData[playerId].dTwelveRolls.nine += 1;
      break;
    }
    case "10": {
      matchData.playerData[playerId].dTwelveRolls.ten += 1;
      break;
    }
    case "11": {
      matchData.playerData[playerId].dTwelveRolls.eleven += 1;
      break;
    }
    case "12": {
      matchData.playerData[playerId].dTwelveRolls.twelve += 1;
      break;
    }
    default: {
      break;
    }
  }
};
