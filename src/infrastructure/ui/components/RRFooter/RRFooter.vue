<template>
  <v-footer class="bg-grey-lighten-4 text-center d-flex flex-column">
    <div class="pt-0">
      Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris
      cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id
      ultrices nunc.
    </div>

    <v-divider></v-divider>

    <div class="ma-2">
      {{ new Date().getFullYear() }} — <strong>Fran Cruz</strong>
    </div>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MyFooter",
  props: {},
});
</script>
