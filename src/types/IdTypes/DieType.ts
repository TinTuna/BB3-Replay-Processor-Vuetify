export type DieType =
  | "0" // a standard d6 (values 1-6)
  | "1" // unknown die type
  | "2" // a block die (values 1-6: attacker down, both down, push, push, defender stumbles, defender down)
  | "3" // unknown die type
  | "4"; // 1d12 roll (values 1-12, or higher for prayers - used in injury table, prayers, etc.)
