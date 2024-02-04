<template>
  <v-card>
    <v-tabs v-model="tab" color="primary" align-tabs="center">
      <v-tab value="home">{{ notificationGameJoined.GameInfos.GamersInfos.GamerInfos[0].Roster.Name }}</v-tab>
      <v-tab value="away">{{ notificationGameJoined.GameInfos.GamersInfos.GamerInfos[1].Roster.Name }}</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="home">
          <TeamStats team="0" :notification-game-joined="notificationGameJoined" :rosters="rosters" :end-game="endGame" />
        </v-window-item>
        <v-window-item value="away">
          <TeamStats team="1" :notification-game-joined="notificationGameJoined" :rosters="rosters" :end-game="endGame" />
        </v-window-item>
      </v-window>
    </v-card-text>

    <v-data-table :items="teamStats" :headers="[
  { title: 'Stat', key: 'stat', align: 'center', width: '50%' },
  { title: notificationGameJoined.GameInfos.GamersInfos.GamerInfos[0].Roster.Name, key: 'home', align: 'center', width: '25%'},
  { title: notificationGameJoined.GameInfos.GamersInfos.GamerInfos[1].Roster.Name, key: 'away', align: 'center', width: '25%' },
]" items-per-page="16">
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

const tab = ref<string>("home");

const props = defineProps({
  notificationGameJoined: { type: Object, required: true },
  rosters: { type: Object, required: true },
  endGame: { type: Object, required: true },
});

const notificationGameJoined = ref<NotificationGameJoined>(
  props.notificationGameJoined as NotificationGameJoined
);
const rosters = ref<Rosters>(props.rosters as Rosters);
const endGame = ref<EndGame>(props.endGame as EndGame);

// const headers = [
//   { title: "Stat", key: "stat", align: "center", width: '50%' },
//   { title: notificationGameJoined.value.GameInfos.GamersInfos.GamerInfos[0].Roster.Name, key: "home", align: "center", width: '25%'},
//   { title: notificationGameJoined.value.GameInfos.GamersInfos.GamerInfos[1].Roster.Name, key: "away", align: "center", width: '25%' },
// ];

const teamStats = computed(() => {
  const stats = []
  // Touchdowns
  const touchdowns = {
    stat: 'Touchdowns',
    home: endGame.value.RulesEventGameFinished.MatchResult.GamerResults.GamerResult[0].TeamResult.TouchdownsBeforeConcede || 0,
    away: endGame.value.RulesEventGameFinished.MatchResult.GamerResults.GamerResult[1].TeamResult.TouchdownsBeforeConcede || 0
  }
  stats.push(touchdowns)
  // Blocks attempted / succeeded
  const blocks = {
    stat: 'Blocks attempted / succeeded',
    home: 0, //endGame.value.RulesEventGameFinished.MatchResult.GamerResults.GamerResult[0].TeamResult.BlocksAttempted || 0,
    away: 0 //endGame.value.RulesEventGameFinished.MatchResult.GamerResults.GamerResult[1].TeamResult.BlocksAttempted || 0
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