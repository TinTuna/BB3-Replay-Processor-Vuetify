<template>
  <v-card>
    <v-tabs v-model="tab" color="primary" align-tabs="center">
      <v-tab value="home">{{ notificationGameJoined.GameInfos.GamersInfos.GamerInfos[0].Roster.Name }}</v-tab>
      <v-tab value="away">{{ notificationGameJoined.GameInfos.GamersInfos.GamerInfos[1].Roster.Name }}</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="home">
          <PlayerStats team="0" :notification-game-joined="notificationGameJoined" :rosters="rosters" :end-game="endGame" />
        </v-window-item>
        <v-window-item value="away">
          <PlayerStats team="1" :notification-game-joined="notificationGameJoined" :rosters="rosters" :end-game="endGame" />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
    
    
<script lang="ts" setup>
import { computed, ref } from "vue";
import { NotificationGameJoined } from "@/types/BaseTags/NotificationGameJoined";
import { Rosters } from "@/types/BaseTags/Roster";
import { EndGame } from "@/types/BaseTags/EndGame";
import { getIdPlayerType } from "@/composables/stringFromIdFunctions/getIdPlayerType";
import { getIdTeamRace } from "@/composables/stringFromIdFunctions/getIdTeamRace";
import PlayerStats from "@/components/Match/PlayerStats/PlayerStats.vue";

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
</script>
      
<style scoped></style>