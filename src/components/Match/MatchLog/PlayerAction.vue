<template>
    <v-card :subtitle="playerType" class="my-3 d-flex flex-column flex-grow-1" @click.stop="drilldown">
        <template v-slot:title>
            <v-icon color="primary" size="large" style="margin-right: -7px">
                {{ `mdi-numeric-${playerNumber[0]}-box` }}
            </v-icon>
            <v-icon v-if="playerNumber[1]" color="primary" size="large" style="margin-left: -7px">
                {{ `mdi-numeric-${playerNumber[1]}-box` }}
            </v-icon>
            <div class="d-inline pl-2 text-wrap">{{ playerName }}</div>
        </template>
        <v-card-text class="d-flex">
            <v-row class="d-flex align-end">
                <v-col v-for="(value, key) in playerActions" :key="key" class="px-1">
                    <v-tooltip :text="value.tooltip" location="bottom">
                        <template v-slot:activator="{ props }">
                            <v-chip size="large" v-bind="props">
                                {{ value.value }}

                                <template v-slot:prepend>
                                    <v-icon :color="value.primaryIconColour">{{ value.icon }}</v-icon>
                                </template>
                                <template v-if="value.secondaryIcon" v-slot:append>
                                    <v-icon :color="value.secondaryIconColour"> {{ value.secondaryIcon }} </v-icon>
                                </template>
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
import { Ref, computed } from "vue";
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
    const x = dataStore.getPlayerType(playerData.value.IdPlayerTypes || "");
    return x ? x : "Unknown";
});

const playerNumber = computed(() => {
    return playerData.value.Number || "00"
});

type PlayerActionChip = {
    icon: string;
    value: string;
    tooltip: string;
    secondaryIcon?: any;
    primaryIconColour?: string;
    secondaryIconColour?: string;
};


const playerActions: Ref<PlayerActionChip[]> = computed(() => {
    return Object.entries(playerAction.value.actionsTaken || {}).map((value) => {
        if (value[0] === "yardsMoved") {
            return {
                icon: "mdi-run",
                primaryIconColour: "primary",
                value: value[1].toString(),
                tooltip: `${value[1]} Yard${value[1] as number > 1 ? 's' : ''} moved`
            };
        }
        if (value[0] === "blockAttempted") {
            let tooltip = `Block - `
            let secondaryIcon = ""
            let secondaryIconColour = ""
            switch (value[1] as Partial<TurnAction['actionsTaken']['blockAttempted']>) {
                case 'attackerDown':
                    secondaryIcon = "mdi-skull"
                    tooltip += `- Attacker down`
                    secondaryIconColour = "error"
                    break
                case 'bothDown':
                    secondaryIcon = "mdi-chevron-double-down"
                    tooltip += `Both down`
                    secondaryIconColour = "warning"
                    break
                case 'push':
                    secondaryIcon = "mdi-arrow-top-right-thick"
                    tooltip += `Push`
                    secondaryIconColour = "info"
                    break
                case 'defenderStumbles':
                    secondaryIcon = "mdi-shield-alert"
                    tooltip += `Defender stumbles`
                    secondaryIconColour = "success"
                    break
                case 'defenderDown':
                    secondaryIcon = "mdi-shield"
                    tooltip += `Defender down`
                    secondaryIconColour = "success"
                    break
            }
            return {
                icon: "mdi-dice-multiple",
                primaryIconColour: "primary",
                value: '',
                tooltip: tooltip,
                secondaryIcon: secondaryIcon,
                secondaryIconColour: secondaryIconColour
            };
        }
        if (value[0] === "injuryInflicted") {
            const injuryObject = value[1] as Partial<TurnAction['actionsTaken']['injuryInflicted']>
            return {
                icon: "mdi-sword",
                value: '',
                tooltip: `Injury Inflicted to ${dataStore.getPlayerName(injuryObject?.player || '')} - ${injuryObject?.type}`,
                primaryIconColour: "error"
            };
        }
        if (value[0] === "injurySustained") {
            const injuryObject = value[1] as Partial<TurnAction['actionsTaken']['injurySustained']>
            return {
                icon: "mdi-hospital-box",
                value: '',
                tooltip: `Injury Sustained - ${injuryObject?.type}`,
                primaryIconColour: "error"
            };
        }
        if (value[0] === "knockdownInflicted") {
            const knockdownObject = value[1] as Partial<TurnAction['actionsTaken']['knockdownInflicted']>
            return {
                icon: "mdi-creation",
                value: '',
                tooltip: `Knockdown Inflicted to ${dataStore.getPlayerName(knockdownObject?.player || '')} - ${knockdownObject?.type}`,
                primaryIconColour: "yellow-darken-4"
            };
        }
        if (value[0] === "touchdownScored") {
            return {
                icon: "mdi-football",
                value: '',
                tooltip: `Touchdown`,
                primaryIconColour: "brown-darken-1"
            };
        }
        if (value[0] === "passAttempted") {
            const passObject = value[1] as Partial<TurnAction['actionsTaken']['passAttempted']>
            if(!passObject) return {
                icon: "mdi-alert",
                value: '',
                tooltip: `Unknown action: ${value[0]}`
            };
            return {
                icon: "mdi-target",
                value: '',
                tooltip: `Pass Attempted to ${dataStore.getPlayerName(passObject.receiverId || '')}  - ${passObject.passSuccess ? 'Succeeded' : 'Failed'}`,
                primaryIconColour: `${passObject.passSuccess ? 'success' : 'error'}`,
            };
        }
        if (value[0] === "handoffAttempted") {
            const handoffObject = value[1] as Partial<TurnAction['actionsTaken']['handoffAttempted']>
            if(!handoffObject) return {
                icon: "mdi-alert",
                value: '',
                tooltip: `Unknown action: ${value[0]}`
            };
            return {
                icon: "mdi-hand-clap",
                value: '',
                tooltip: `Handoff Attempted to ${dataStore.getPlayerName(handoffObject.receiverId || '')}`,
                primaryIconColour: 'success',
            };
        }
        if (value[0] === "catchAttempted") {
            const catchObject = value[1] as Partial<TurnAction['actionsTaken']['catchAttempted']>
            if(!catchObject) return {
                icon: "mdi-alert",
                value: '',
                tooltip: `Unknown action: ${value[0]}`
            };
            return {
                icon: "mdi-handball",
                value: '',
                tooltip: `Catch Attempted - ${catchObject.catchSuccess ? 'Succeeded' : 'Failed'}`,
                primaryIconColour: `${catchObject.catchSuccess ? 'success' : 'error'}`,
            };
        }
        if (value[0] === "pickupAttempted") {
            const pickupObject = value[1] as Partial<TurnAction['actionsTaken']['pickupAttempted']>
            if(!pickupObject) return {
                icon: "mdi-alert",
                value: '',
                tooltip: `Unknown action: ${value[0]}`
            };
            return {
                icon: "mdi-hand-front-right",
                value: '',
                tooltip: `Pickup Attempted - ${pickupObject.pickupSuccess ? 'Succeeded' : 'Failed'}`,
                primaryIconColour: `${pickupObject.pickupSuccess ? 'success' : 'error'}`,
            };
        }
        if (value[0] === "standUp") {
            return {
                icon: "mdi-chevron-up-circle",
                value: '',
                tooltip: `Stand Up`,
                primaryIconColour: "blue"
            };
        }
        if (value[0] === "foulAttempted") {
            const foulObject = value[1] as Partial<TurnAction['actionsTaken']['foulAttempted']>
            if(!foulObject) return {
                icon: "mdi-alert",
                value: '',
                tooltip: `Unknown action: ${value[0]}`
            };
            return {
                icon: "mdi-shoe-cleat",
                value: '',
                tooltip: `Foul Attempted on ${dataStore.getPlayerName(foulObject.fouledPlayer || '')}`,
                primaryIconColour: `error`,
            };
        }
        if (value[0] === "sentOff") {
            return {
                icon: "mdi-cards",
                value: '',
                tooltip: `Sent Off`,
                primaryIconColour: "error"
            };
        }
        return {
            icon: "mdi-alert",
            value: '',
            tooltip: `Unknown action: ${value[0]}`
        };
    });
});

const drilldown = () => {
    /// drilldown to player page
}

</script>

<style scoped></style>