<template>
    <v-timeline direction="vertical" truncate-line="both">
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

        <v-timeline-item v-for="(event, i) in events" :key="i"
            :dot-color="event?.iconColor ? event?.iconColor : event?.color" :size="event?.size" :icon="event?.icon"
            fill-dot>
            <v-tooltip v-if="event?.tooltip" :text="event?.tooltip" location="bottom">
                <template v-slot:activator="{ props: tooltipProps }">
                    <v-card v-bind="tooltipProps" v-if="event?.title" @click.stop="props.drilldown(event)" elevation="3">
                        <v-card-title :class="['text-subtitle-1', `bg-${event?.color}`]">
                            {{ event?.title }}
                        </v-card-title>
                        <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
                        <v-card-text v-if="event?.text" class="py-2 text-body-2" v-html="event?.text"></v-card-text>
                    </v-card>
                </template>
            </v-tooltip>
            <v-card v-if="event?.title && !event?.tooltip && event?.clickable" @click.stop="props.drilldown(event)" elevation="3">
                <v-card-title :class="['text-subtitle-1', `bg-${event?.color}`]">
                    {{ event?.title }}
                </v-card-title>
                <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
                <v-card-text v-if="event?.text" class="py-2 text-body-2" v-html="event?.text"></v-card-text>
            </v-card>
            <v-card v-if="event?.title && !event?.tooltip && !event?.clickable" elevation="3">
                <v-card-title :class="['text-subtitle-1', `bg-${event?.color}`]">
                    {{ event?.title }}
                </v-card-title>
                <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
                <v-card-text v-if="event?.text" class="py-2 text-body-2" v-html="event?.text"></v-card-text>
            </v-card>

            <!-- <template v-if="event?.opp" v-slot:opposite>
                <v-card>
                    <v-card-title :class="`${event.oppFont ? event.oppFont : 'text-h6'} ${event.oppColour ? 'bg-' + event.oppColour : ''}`">
                        {{ event?.opp }}
                    </v-card-title>
                </v-card>
            </template> -->
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
    iconColor?: string;
    size?: string;
    tooltip?: string;
    title: string;
    text?: string;
    opp?: string;
    oppColour?: string;
    oppFont?: string;
    drilldown?: {
        turn: number;
        team: string;
    }
    clickable?: boolean;
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
                iconColor: 'brown',
                size: 'large',
                tooltip: `Turn: ${event.turn}`,
                title: `Touchdown`,
                text: `${dataStore.getTeamName(event.team).replaceAll(' ', '&nbsp;')}<br>${dataStore.getPlayerName(event.touchdownScorer || "").replaceAll(' ', '&nbsp;')}`,
                opp: `Turn: ${event.turn}`,
                oppFont: 'text-subtitle-1',
                drilldown: {
                    turn: event.turn,
                    team: event.team
                },
                clickable: true
            } as Event
        }
        if (event.injury) {
            return {
                color: event.team === '0' ? 'red-lighten-2' : 'blue-lighten-2',
                icon: 'mdi-hospital-box',
                iconColor: 'red',
                size: 'x-small',
                tooltip: `Turn: ${event.turn}`,
                title: `Injury`,
                text: `${dataStore.getTeamName(event.team).replaceAll(' ', '&nbsp;')}`,
                // text: `${dataStore.getTeamName(event.team).replaceAll(' ', '&nbsp;')}<br>${dataStore.getPlayerName(event.injuryPlayer || "").replaceAll(' ', '&nbsp;')}`,
                opp: `Turn: ${event.turn}`,
                oppFont: 'text-subtitle-1',
                drilldown: {
                    turn: event.turn,
                    team: event.team
                },
                clickable: true
            } as Event
        }

        console.log('event', event)

    }).filter(Boolean) || []
});

</script>

<style scoped></style>