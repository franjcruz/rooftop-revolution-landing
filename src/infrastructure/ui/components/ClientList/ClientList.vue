<template>
  <v-list lines="one">
    <v-list-item key="cups" :title="client.cups" subtitle="CUPS"></v-list-item>
    <v-list-item
      key="fullname"
      :title="client.fullname"
      subtitle="Full Name"
    ></v-list-item>
    <v-list-item
      key="address"
      :title="client.address"
      subtitle="Address"
    ></v-list-item>
    <v-list-item
      key="building_type"
      :title="client.buildingType"
      subtitle="Building Type"
    ></v-list-item>
    <v-list-item key="role" :title="client.role" subtitle="Role"></v-list-item>
  </v-list>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ClientList",
  props: { client: Object },
});
</script>
