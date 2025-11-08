import { PlayerId } from "@/types/IdTypes/PlayerId";
import { MatchData } from "@/types/MatchData";

export const addBasePlayerData = (
  matchData: MatchData,
  teamId: string,
  playerId: PlayerId
): MatchData => {
  matchData.playerData[playerId] = {
    playerId: playerId,
    teamId: teamId,
    // movement stats
    yardsMoved: 0,
    yardsMovedWithBall: 0,
    // passing stats
    passesAttempted: {
      handoff: 0,
      short: 0,
      long: 0,
      longBomb: 0,
    },
    passesCompleted: {
      handoff: 0,
      short: 0,
      long: 0,
      longBomb: 0,
    },
    passesCaught: 0,
    passesDropped: 0,
    passesIntercepted: 0,
    // blocking stats
    blocksAttempted: 0,
    blockDiceRolled: {
      attackerDown: 0,
      bothDown: 0,
      push: 0,
      defenderStumbles: 0,
      defenderDown: 0,
    },
    blockDiceTaken: {
      attackerDown: 0,
      bothDown: 0,
      push: 0,
      defenderStumbles: 0,
      defenderDown: 0,
    },
    blockingRerollsUsed: {
      team: 0,
      pro: 0,
      brawler: 0,
    },
    assistsReceived: 0,
    pushFollowUps: 0,
    // receiving blocks
    timesPushed: 0,
    timesRemovedFromPlay: 0,
    // d6 rolls
    dSixRolls: {
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
      six: 0,
    },
    // d12 rolls
    dTwelveRolls: {
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
      six: 0,
      seven: 0,
      eight: 0,
      nine: 0,
      ten: 0,
      eleven: 0,
      twelve: 0,
    },
    // injuries
    armourRolls: {
      armourRolls: 0,
      armourRollsPassed: 0,
      armourRollsFailed: 0,
    },
    injuryRollsSustained: {
      injuryRolls: 0,
      injuryStunned: 0,
      injuryKO: 0,
      injuryBadlyHurt: 0,
      injurySeriousInjury: 0,
    },
    casualtiesSustained: {
      casualtyRolls: 0,
      casualtyBadlyHurt: 0,
      casualtySeriouslyHurt: 0,
      casualtySeriousInjury: 0,
      casualtyLastingInjury: 0,
      casualtyDeath: 0,
    },
    injuryRollsInflicted: {
      injuryRolls: 0,
      injuryStunned: 0,
      injuryKO: 0,
      injuryBadlyHurt: 0,
      injurySeriousInjury: 0,
    },
    casualtiesInflicted: {
      casualtyRolls: 0,
      casualtyBadlyHurt: 0,
      casualtySeriouslyHurt: 0,
      casualtySeriousInjury: 0,
      casualtyLastingInjury: 0,
      casualtyDeath: 0,
    },
  };
  return matchData;
};
