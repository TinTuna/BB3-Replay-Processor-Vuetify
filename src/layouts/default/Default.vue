<template>
  <v-app style="background-color:#e8f3f5">
    <app-bar />
    <router-view />
    <v-hover>
      <template v-slot:default="{ isHovering, props }">
        <v-expand-transition>
          <v-card v-bind="props" v-show="isHovering" style="z-index: 100;position: fixed;bottom: 17px;left: 17px"
            class="rounded-bs-xl">
            <v-card-title class="text-center">
              <v-icon color="green">mdi-information</v-icon>
              <span class="ml-2">Encountered an issue?</span>
            </v-card-title>
            <v-card-text class="d-flex" style="display: flex;align-items: center;">
              <p>
                Send me the .bbr file and I'll take a look:
                <br />
                <b>BB3Replay@gmail.com</b>
              </p>
              <v-btn icon href="https://discordapp.com/users/299945264242753546" target="_blank" class="ml-3">
                <v-img :src="discord" height="30" width="30" contain></v-img>
              </v-btn>
              <v-btn icon href="mailto:bb3replay@gmail.com?subject=BB3Replay File" target="_blank" class="ml-3">
                <v-icon color="blue">mdi-email</v-icon>
              </v-btn>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text class="ml-15">
              <p>BB3 Replay Processor</p>
              <p>Version {{ version }}</p>
            </v-card-text>
          </v-card>
        </v-expand-transition>
        <v-btn v-bind="props" icon="mdi-chat-question" size="x-large" color="green"
          style="z-index: 100;position: fixed;bottom: 15px;left: 15px"></v-btn>
      </template>
    </v-hover>
    <v-footer height="50">
      <v-row justify="center">
        <v-col>
          <v-card color="beige" class="text-center" elevation="0">
            <v-card-text>
              <p>
                Not officially endorsed by Blood Bowl 3 and/or Cyanide Studios. All rights belonging to Games Workshop.
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script lang="ts" setup>
import AppBar from './AppBar.vue'

const version = APP_VERSION

const discord = new URL('/discord.webp', import.meta.url).href

</script>


