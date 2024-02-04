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
            yardsMoved?: number;
            yardsMovedWithBall?: number;
            passesAttempted?: {
                handoff?: number;
                short?: number;
                long?: number;
                longBomb?: number;
            }
            passesCompleted?: {
                handoff?: number;
                short?: number;
                long?: number;
                longBomb?: number;
            };
            passesCaught?: number;
            passesDropped?: number;
            passesIntercepted?: number;

        };
    }
}