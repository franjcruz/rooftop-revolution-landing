<template>
  <v-parallax id="main-image" src="solar-power-rooftop.jpg" height="750">
    <v-card class="card-form ma-15 align-middle float-end">
      <v-card-title>
        Check if your rooftop is suitable for solar panels
      </v-card-title>
      <v-card-subtitle>
        Check if your rooftop is suitable for solar panels
      </v-card-subtitle>
      <v-form v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="firstname"
                :counter="10"
                :rules="nameRules"
                label="First name"
                hide-details
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-btn> Check </v-btn>
          </v-card-actions>
        </v-container>
      </v-form>
    </v-card>
  </v-parallax>
</template>

<style scoped>
#main-image > div.v-responsive__sizer {
  background: linear-gradient(to right bottom, transparent, #ed85044d);
}

.card-form {
  border-radius: 10px;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LandingTop",
  props: {},
});
</script>
