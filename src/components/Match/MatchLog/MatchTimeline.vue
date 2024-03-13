<template>
    <v-timeline direction="horizontal" truncate-line="both" class="my-10 py-1" style="overflow-x: auto; overflow-y: hidden;">
        <v-timeline-item dot-color="green" icon="mdi-whistle">
            <template v-slot:opposite>
                <v-card class="ml-3">
                    <v-card-title :class="['text-h6', `bg-green`]">
                        0:0
                    </v-card-title>
                </v-card>
            </template>
            <v-card class="ml-3">
                <v-card-title :class="['text-h6', `bg-green`]">
                    Kickoff
                </v-card-title>
            </v-card>
        </v-timeline-item>

        <v-timeline-item v-for="(event, i) in events" :key="i" :dot-color="event?.color" :size="event?.size"
            :icon="event?.icon" fill-dot>
            <v-card @click="props.drilldown(event)">
                <v-card-title :class="['text-subtitle-1', `bg-${event?.color}`]">
                    {{ event?.title }}
                </v-card-title>
                <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
                <v-card-text v-if="event?.text" class="py-2 text-body-2" v-html="event?.text"></v-card-text>
            </v-card>
            <template v-if="event?.opp" v-slot:opposite>
                <v-card>
                    <v-card-title :class="`${event.oppFont ? event.oppFont : 'text-h6'} ${event.oppColour ? 'bg-' + event.oppColour : ''}`">
                        {{ event?.opp }}
                    </v-card-title>
                </v-card>
            </template>
        </v-timeline-item>

        <v-timeline-item dot-color="green" icon="mdi-whistle">
            <template v-slot:opposite>
                <v-card class="mr-3">
                    <v-card-title :class="['text-h6', `bg-green`]">
                        {{ homeFTScore }}:{{ awayFTScore }}
                    </v-card-title>
                </v-card>
            </template>
            <v-card class="mr-3">
                <v-card-title :class="['text-h6', `bg-green`]">
                    Fulltime
                </v-card-title>
            </v-card>
        </v-timeline-item>
    </v-timeline>
</template>


<script lang="ts" setup>
import { useDataStore } from "@/store/dataStore";
import { computed } from "vue";

const props = defineProps({
  drilldown: { type: Function, required: true }
});

const dataStore = useDataStore();

const homeFTScore = dataStore.endGame?.RulesEventGameFinished.MatchResult.GamerResults
    .GamerResult[0].TeamResult.TouchdownsBeforeConcede || 0;
const awayFTScore = dataStore.endGame?.RulesEventGameFinished.MatchResult.GamerResults
    .GamerResult[1].TeamResult.TouchdownsBeforeConcede || 0;

export type Event = {
    color: string;
    icon: string;
    size?: string;
    title: string;
    text?: string;
    opp?: string;
    oppColour?: string;
    oppFont?: string;
    drilldown?: {
        turn: number;
        team: string;
    }
}

const events = computed(() => {
    // loop over the match events and return the key events
    let inputHalftime = false
    let currHomeScore = 0
    let currAwayScore = 0
    return dataStore.matchData?.matchLog.map((event) => {
        if (!inputHalftime && event.turn > 8) {
            inputHalftime = true
            return {
                color: 'green-lighten-1',
                icon: 'mdi-whistle',
                title: 'Halftime',
                opp: `${currHomeScore}:${currAwayScore}`,
                oppColour: 'green',
                oppFont: 'text-h6'
            } as Event
        }
        if (event.touchdown) {
            if (event.team === '0') {
                currHomeScore++
            } else {
                currAwayScore++
            }
            return {
                color: event.team === '0' ? 'red-lighten-2' : 'blue-lighten-2',
                icon: 'mdi-football',
                size: 'x-small',
                title: `Touchdown`,
                text: `${dataStore.getTeamName(event.team).replaceAll(' ', '&nbsp;')}<br>${dataStore.getPlayerName(event.touchdownScorer || "").replaceAll(' ', '&nbsp;')}`,
                opp: `Turn: ${event.turn}`,
                oppFont: 'text-subtitle-1',
                drilldown: {
                    turn: event.turn,
                    team: event.team
                }
            } as Event
        }
    }).filter(Boolean) || []
});

</script>

<style scoped></style>