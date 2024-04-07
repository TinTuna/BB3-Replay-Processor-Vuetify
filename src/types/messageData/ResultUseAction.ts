export type ResultUseAction = {
  Action: Action
  TeamId: "0" | "1"
};

type Action = "1" | "2" | "3" | "4" | "5" | "6"

// 1 move
// 2 block
// 3 blitz
// 4 pass
// 5 handoff
// 6 foul
// throw team-mate?