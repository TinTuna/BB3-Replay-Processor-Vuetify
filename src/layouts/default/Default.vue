<template>
  <v-app style="background-color:#e8f3f5">
    <app-bar />
    <router-view />
    <v-footer height="50">
      <v-row justify="center">
        <v-col>
          <v-card color="beige" class="text-center" elevation="0">
            <v-card-text>
              <p>Not officially endorsed by Blood Bowl 3 and or Cyanide Studios. All rights belonging to Games Workshop</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script lang="ts" setup>
import AppBar from './AppBar.vue'
</script>
