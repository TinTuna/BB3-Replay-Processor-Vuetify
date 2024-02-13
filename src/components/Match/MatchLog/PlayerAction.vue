<template>
    <v-card>
        <v-card-title>{{ playerAction.playerId ? dataStore.getPlayerName(playerAction.playerId) :
            playerAction.playerId }}</v-card-title>
        <v-card-text>
            <v-row>
                <v-col v-for="(value, key) in playerActions" :key="key">
                    {{ value[0] }}: {{ value[1] }}
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

const playerActions = computed(() => {
    return Object.entries(playerAction.value.actionsTaken || {}).map((value) => {
        if (value[0] === "yardsMoved") {
            return ["Yards moved", value[1] ];
        }
        if (value[0] === "blocksAttempted") {
            return ["Blocks attempted", value[1] ];
        }
        if (value[0] === "blocksSucceeded") {
            return ["Blocks succeeded", value[1] ];
        }
        if (value[0] === "injuriesInflicted") {
            return ["Injuries inflicted", value[1] ];
        }
        if (value[0] === "touchdownsScored") {
            return ["Touchdowns scored", value[1] ];
        }
        return value;
    });


});


</script>
        
<style scoped></style>