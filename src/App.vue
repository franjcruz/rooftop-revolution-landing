<template>
  <v-app id="rooftop-revo">
    <MainPage></MainPage>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { MainPage } from "@/infrastructure/ui/pages";

export default defineComponent({
  name: "App",
  props: {},
  components: {
    MainPage,
  },
});
</script>
