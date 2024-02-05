export type MatchData = {
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
    playerData: {
        [key: string]: {
            playerId: string;
            teamId: string;
            yardsMoved: number;
            yardsMovedWithBall: number;
            passesAttempted: {
                handoff: number;
                short: number;
                long: number;
                longBomb: number;
            }
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
        };
    }
}