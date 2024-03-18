<template>
    <v-card :subtitle="playerType" class="my-3" @click.stop="drilldown">
        <template v-slot:title>
            <v-icon color="primary" size="large" style="margin-right: -7px">
                {{ `mdi-numeric-${playerData.Number[0]}-box` }}
            </v-icon>
            <v-icon v-if="playerData.Number[1]" color="primary" size="large" style="margin-left: -7px">
                {{ `mdi-numeric-${playerData.Number[1]}-box` }}
            </v-icon>
            <div class="d-inline pl-2">{{ playerName }}</div>
        </template>
        <v-card-text>
            <v-row>
                <v-col v-for="(value, key) in playerActions" :key="key">
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
    return dataStore.getPlayerType(playerData.value.IdPlayerTypes || "");
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
            return {
                icon: "mdi-hospital-box",
                value: '',
                tooltip: `Injury - ${value[1]}`,
                primaryIconColour: "error"
            };
        }
        if (value[0] === "knockdownInflicted") {
            return {
                icon: "mdi-creation",
                value: '',
                tooltip: `Knockdown - ${value[1]}`,
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
        return {
            icon: "mdi-alert",
            value: value[1].toString(),
            tooltip: `Unknown action: ${value[0]}`
        };


    });
});

const drilldown = () => {
    /// drilldown to player page
}

</script>

<style scoped></style>