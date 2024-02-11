<template>
    <v-container>
        <v-card v-for="logEntry in dataStore.matchData?.matchLog" :key="logEntry.turn" elevation="4" class="my-2 py-2">
            <v-card-title>Turn {{ logEntry.turn }} - {{ logEntry.team === "0" ? dataStore.getTeamName("0") :
                dataStore.getTeamName("1") }}</v-card-title>
            <v-card v-for="playerAction in logEntry.turnActions" :key="`${playerAction.playerId}-${logEntry.turn}`">
                <v-card-title>{{ playerAction.playerId ? dataStore.getPlayerName(playerAction.playerId) :
                    playerAction.playerId }}</v-card-title>
                <v-card-text>
                    <v-card v-for="action in playerAction.turnActionEvents"
                        :key="`${action.eventType}-${playerAction.playerId}-${logEntry.turn}`" class="ma-2 pa-0">
                        <v-card-text>
                            <v-list class="pa-0">
                                <v-list-item v-for="result in action.eventResults"
                                    :key="`${result.actionName}-${action.eventType}-${playerAction.playerId}-${logEntry.turn}`">
                                    <v-list-item-title>{{ result.actionName }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-card-text>
                    </v-card>
                </v-card-text>
            </v-card>
        </v-card>
    </v-container>
</template>
      
      
<script lang="ts" setup>
import { useDataStore } from "@/store/dataStore";

const dataStore = useDataStore();

</script>
        
<style scoped></style>