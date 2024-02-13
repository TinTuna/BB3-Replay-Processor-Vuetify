export type EndTurnReasons =
    | "0"
    | "1" // clicked end turn ?
    | "2" // forced end turn ? (e.g. end of turn timer, touchdown or turnover)
    | "3"
    | "4" // end of a Half