<template>
  <v-list lines="one">
    <v-list-item
      key="tariff"
      :title="supplyPoint.tariff"
      subtitle="Tariff"
    ></v-list-item>
    <v-list-item
      key="invoiced_amount"
      :title="supplyPoint.invoicedAmount"
      subtitle="Invoiced Amount"
    ></v-list-item>
    <v-list-item
      v-for="(power, key) in supplyPoint.power"
      :key="power"
      :title="power"
      :subtitle="key"
    ></v-list-item>
    <v-list-item
      key="neighbors"
      :title="supplyPoint.neighbors.join(', ')"
      subtitle="Neighbors"
    ></v-list-item>
  </v-list>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SupplyPointList",
  props: { supplyPoint: Object },
});
</script>
