<template>
  <v-app style="background-color:#e8f3f5">
    <app-bar />
    <router-view />
  </v-app>
</template>

<script lang="ts" setup>
import AppBar from './AppBar.vue'
</script>
