<template>
  <v-card>
    <v-tabs v-model="tab" color="primary" align-tabs="center">
      <v-tab value="home">{{ dataStore.notificationGameJoined?.GameInfos.GamersInfos.GamerInfos[0].Roster.Name }}</v-tab>
      <v-tab value="away">{{ dataStore.notificationGameJoined?.GameInfos.GamersInfos.GamerInfos[1].Roster.Name }}</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="home">
          <TeamStats team="0" />
        </v-window-item>
        <v-window-item value="away">
          <TeamStats team="1" />
        </v-window-item>
      </v-window>
    </v-card-text>

    <v-data-table :items="teamStats" :headers="headers" items-per-page="16">
      <template #bottom></template>
    </v-data-table>
  </v-card>
</template>
    
    
<script lang="ts" setup>
import { computed, ref } from "vue";
import { NotificationGameJoined } from "@/types/BaseTags/NotificationGameJoined";
import { Rosters } from "@/types/BaseTags/Roster";
import { EndGame } from "@/types/BaseTags/EndGame";
import { getIdPlayerType } from "@/composables/stringFromIdFunctions/getIdPlayerType";
import { getIdTeamRace } from "@/composables/stringFromIdFunctions/getIdTeamRace";
import TeamStats from "@/components/Match/TeamStats/TeamStats.vue";
import { useDataStore } from "@/store/dataStore";

const dataStore = useDataStore();

const tab = ref<string>("home");

const headers = [
  { title: 'Stat', key: 'stat', align: 'center', width: '50%' },
  { title: dataStore.notificationGameJoined?.GameInfos.GamersInfos.GamerInfos[0].Roster.Name, key: 'home', align: 'center', width: '25%'},
  { title: dataStore.notificationGameJoined?.GameInfos.GamersInfos.GamerInfos[1].Roster.Name, key: 'away', align: 'center', width: '25%' },
] as unknown as any[];

const teamStats = computed(() => {
  const stats = []
  // Touchdowns
  const touchdowns = {
    stat: 'Touchdowns',
    home: dataStore.endGame?.RulesEventGameFinished.MatchResult.GamerResults.GamerResult[0].TeamResult.TouchdownsBeforeConcede || 0,
    away: dataStore.endGame?.RulesEventGameFinished.MatchResult.GamerResults.GamerResult[1].TeamResult.TouchdownsBeforeConcede || 0
  }
  stats.push(touchdowns)
  // Blocks attempted / succeeded
  const blocks = {
    stat: 'Blocks attempted / succeeded',
    home: 0,
    away: 0
  }
  stats.push(blocks)
  // Armor Breaks
  // Stuns
  // KOs
  // Injuries
  // Kills
  // Total yards run
  // Yards run with the ball
  // Yards Passed 
  // Blitzs
  // Fouls
  // Red cards
  // Interceptions
  // Catches
  // Dodges
  // Pickups
  // Total Passes
  // Handoffs
  // Short Passes
  // Long Passes
  // Long Bombs
  // Total SPP Earned
  // GFIs
  // Re-Rolls Used
  // Turnovers
  // Throw Teammates
  // Star Players
  // Inducements Bought
  // Chainsaw
  // Fireball
  // Hypnotic Gaze
  // Jump Over
  // Projectile Vomit
  // Stab
  // Zap!

  return stats
});

</script>
      
<style scoped></style>