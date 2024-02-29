<template>
    <v-card :title="playerName" :subtitle="playerType" class="my-3">
        <v-card-text>
            <v-row>
                <v-col v-for="(value, key) in playerActions" :key="key">
                    <v-tooltip :text="value[2].toString()" location="bottom">
                        <template v-slot:activator="{ props }">
                            <v-chip v-bind="props" :prepend-icon="value[0].toString()">
                                {{ value[1] }}
                            </v-chip>
                        </template>
                    </v-tooltip>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
      
      
<script lang="ts" setup>
import { useDataStore } from "@/store/dataStore";
import { Turn } from "@/types/Match/Turn";
import { TurnAction } from "@/types/Match/TurnAction";
import { computed } from "vue";
import { ref } from "vue";

const dataStore = useDataStore();


const props = defineProps({
    logEntryProp: { type: Object, required: true },
    playerActionProp: { type: Object, required: true }
});

const logEntry = ref<Turn>(props.logEntryProp as Turn);
const playerAction = ref<TurnAction>(props.playerActionProp as TurnAction);

const playerName = computed(() => {
    return dataStore.getPlayerName(playerAction.value.playerId || "");
});

const playerData = computed(() => {
    return dataStore.getPlayerData(playerAction.value.playerId || "");
});

const playerType = computed(() => {
    return dataStore.getPlayerType(playerData.value.IdPlayerTypes || "");
});

const playerActions = computed(() => {
    return Object.entries(playerAction.value.actionsTaken || {}).map((value) => {
        if (value[0] === "yardsMoved") {
            return ["mdi-run", value[1], `${value[1]} Yard${value[1] > 1 ? 's' : ''} moved`];
        }
        if (value[0] === "blocksAttempted") {
            return ["mdi-shield", value[1], `${value[1]} Block${value[1] > 1 ? 's' : ''} attempted`];
        }
        if (value[0] === "injuriesInflicted") {
            return ["mdi-hospital-box", value[1], `${value[1]} Injurie${value[1] > 1 ? 's' : ''} inflicted`];
        }
        if (value[0] === "touchdownsScored") {
            return ["mdi-football", value[1], `Touchdown scored`];
        }
        return ["mdi-alert", value[1], `Unknown action: ${value[0]}`];
    });
});


</script>
        
<style scoped></style>