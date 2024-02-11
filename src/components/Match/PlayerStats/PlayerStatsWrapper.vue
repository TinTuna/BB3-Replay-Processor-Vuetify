<template>
  <v-card>
    <v-tabs v-model="tab" color="primary" align-tabs="center">
      <!-- <v-tab value="home">{{ dataStore.notificationGameJoined?.GameInfos.GamersInfos.GamerInfos[0].Roster.Name }}</v-tab>
      <v-tab value="away">{{ dataStore.notificationGameJoined?.GameInfos.GamersInfos.GamerInfos[1].Roster.Name }}</v-tab> -->
      <v-tab value="home">{{ dataStore.getTeamName("0") }}</v-tab>
      <v-tab value="away">{{ dataStore.getTeamName("1") }}</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="home">
          <PlayerStats team="0" />
        </v-window-item>
        <v-window-item value="away">
          <PlayerStats team="1" />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
    
    
<script lang="ts" setup>
import { ref } from "vue";
import PlayerStats from "@/components/Match/PlayerStats/PlayerStats.vue";
import { useDataStore } from "@/store/dataStore";

const dataStore = useDataStore();

const tab = ref<string>("home");

</script>
      
<style scoped></style>