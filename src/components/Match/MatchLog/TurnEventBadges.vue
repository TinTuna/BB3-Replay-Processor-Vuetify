<template>
  <div v-if="hasEvents" class="event-badges ml-auto mr-2">
    <v-chip
      v-if="logEntry.touchdown"
      size="large"
      color="brown"
      variant="flat"
      class="ma-1"
    >
      <v-icon start size="small">mdi-football</v-icon>
      TD
    </v-chip>
    <v-chip
      v-if="logEntry.turnover"
      size="large"
      color="amber-darken-2"
      variant="flat"
      class="ma-1"
    >
      <v-icon start size="small">mdi-alert-box</v-icon>
      TO
    </v-chip>
    <v-chip
      v-if="logEntry.death"
      size="large"
      color="grey-darken-4"
      variant="flat"
      class="ma-1"
    >
      <v-icon start size="small">mdi-skull</v-icon>
      {{ logEntry.death }}
    </v-chip>
    <v-chip
      v-if="logEntry.injury"
      size="large"
      color="red-darken-2"
      variant="flat"
      class="ma-1"
    >
      <v-icon start size="small">mdi-sword</v-icon>
      {{ logEntry.injury }}
    </v-chip>
    <v-chip
      v-if="logEntry.injurySustained"
      size="large"
      color="orange-darken-2"
      variant="flat"
      class="ma-1"
    >
      <v-icon start size="small">mdi-hospital-box</v-icon>
      {{ logEntry.injurySustained }}
    </v-chip>
    <v-chip
      v-if="logEntry.sentOff"
      size="large"
      color="red-darken-3"
      variant="flat"
      class="ma-1"
    >
      <v-icon start size="small">mdi-cards</v-icon>
      Sent Off
    </v-chip>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { Turn } from "@/types/Match/Turn";

const props = defineProps<{
  logEntry: Turn;
}>();

const hasEvents = computed(() => {
  return !!(
    props.logEntry.death ||
    props.logEntry.injury ||
    props.logEntry.touchdown ||
    props.logEntry.turnover ||
    props.logEntry.injurySustained ||
    props.logEntry.sentOff
  );
});
</script>

<style scoped lang="scss">
.event-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
</style>
