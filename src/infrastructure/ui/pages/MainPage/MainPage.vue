<template>
  <RRHeader />
  <v-main>
    <LandingTop />
    <LandingContent />
    <RRFooter />
  </v-main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  RRFooter,
  RRHeader,
  LandingContent,
  LandingTop,
} from "@/infrastructure/ui/components";

export default defineComponent({
  name: "MainPage",
  props: {},
  components: {
    RRFooter,
    RRHeader,
    LandingContent,
    LandingTop,
  },
});
</script>
