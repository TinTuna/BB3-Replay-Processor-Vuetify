<template>
    <v-card>
        <template v-for="playerAction in logEntry.turnActions" :key="`${playerAction.playerId}-${logEntry.turn}`">
            <PlayerAction :player-action-prop="playerAction" :log-entry-prop="logEntry" />
        </template>
    </v-card>
</template>
      
      
<script lang="ts" setup>
import { useDataStore } from "@/store/dataStore";
import { Turn } from "@/types/Match/Turn";
import { ref } from "vue";
import PlayerAction from "./PlayerAction.vue";

const dataStore = useDataStore();


const props = defineProps({
    logEntryProp: { type: Object, required: true }
});

const logEntry = ref<Turn>(props.logEntryProp as Turn);

</script>
        
<style scoped></style>