<template>
  <v-app-bar>
    <v-app-bar-title class="header-title"> Rooftop Revolution </v-app-bar-title>
    <v-btn id="about"> About us </v-btn>
    <v-btn id="contact"> Contact </v-btn>
  </v-app-bar>
</template>

<style scoped>
.header-title {
  font-family: monospace;
  letter-spacing: 1px;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "RRHeader",
  props: {},
});
</script>
