// Utilities
import { MatchData } from "@/types/MatchData";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useDataStore = defineStore("data", () => {
  const matchData = ref<MatchData | null>(null);
  return {
    matchData,
  };
});
