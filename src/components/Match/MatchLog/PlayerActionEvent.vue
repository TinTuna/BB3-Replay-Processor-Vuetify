<template>
    <v-card>
        <v-card-title>{{ playerAction.playerId ? dataStore.getPlayerName(playerAction.playerId) :
            playerAction.playerId }}</v-card-title>
        <v-card-text>
            <v-card class="ma-2 pa-0">
            </v-card>
        </v-card-text>
    </v-card>
</template>
      
      
<script lang="ts" setup>
import { useDataStore } from "@/store/dataStore";
import { Turn } from "@/types/Match/Turn";
import { TurnAction } from "@/types/Match/TurnAction";
import { ref } from "vue";

const dataStore = useDataStore();


const props = defineProps({
    logEntryProp: { type: Object, required: true },
    playerActionProp: { type: Object, required: true }
});

const logEntry = ref<Turn>(props.logEntryProp as Turn);
const playerAction = ref<TurnAction>(props.playerActionProp as TurnAction);


</script>
        
<style scoped></style>