<template>
  <v-app-bar :elevation="3">
    <v-app-bar-title class="ml-5 main-title">
      <v-img :src="imgUrl" max-height="90" max-width="90" contain></v-img>
      <div class="ml-3">BB3 Replay Processor</div>
    </v-app-bar-title>
    <v-app-bar-title>
      <v-container class="d-flex flex-row-reverse">
        <v-tabs v-model="tab" background-color="transparent">
          <template v-for="(item, i) in items" :key="i">
            <router-link :to="item.link" v-slot="{ href }">
              <v-tab :to="href" exact>{{ item.title }}</v-tab>
            </router-link>
          </template>
        </v-tabs>
      </v-container>
    </v-app-bar-title>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { ref } from "vue"

const tab = ref(0);

const items = [
  { title: "Replay Processor", link: "/" },
  { title: "Git Repository", link: "/git" }
];

const imgUrl = new URL('/bb3-logo.png', import.meta.url).href

</script>


<style scoped>
.v-slide-group__container a {
  color: #03045E !important;
}
</style>
<style>
.main-title .v-toolbar-title__placeholder {
  display: flex;
  align-items: center;
}
</style>
