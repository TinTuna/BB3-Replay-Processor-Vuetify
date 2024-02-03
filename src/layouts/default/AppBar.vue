<template>
  <v-app-bar :elevation="2">
    <v-app-bar-title class="ml-5" width="100%"
      >BB3 Replay Processor</v-app-bar-title
    >
    <v-app-bar-title>
      <v-container class="d-flex flex-row-reverse">
        <v-tabs v-model="tab" background-color="transparent">
          <template v-for="(item, i) in items" :key="i"> 
            <router-link :to="item.link" v-slot="{ href }" >
              <v-tab :to="href" exact>{{ item.title }}</v-tab>
            </router-link>
          </template>
        </v-tabs>
      </v-container>
    </v-app-bar-title>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const tab = ref(0);

const items = [
  { title: "Replay Processor", link: "/" },
  { title: "Git Repository", link: "/git" }
];
</script>

<style scoped>
.v-slide-group__container a {
  color: #03045E !important;
}
</style>
