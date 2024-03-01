<template>
  <v-parallax src="solar-power-rooftop.jpg" height="750">
    <v-card
      class="card-form align-middle float-end"
      max-width="600"
      max-height="600"
    >
      <v-card-title> Get enrolled with the rooftop revolution! </v-card-title>
      <v-card-text>
        Check if your rooftop condition is suitable for solar panels and if you
        are able to get a offer. Just enter your CUPS number and we will check.
      </v-card-text>
      <v-form
        v-model="valid"
        v-if="!result"
        @submit.prevent="submitHandler"
        id="check-form"
      >
        <v-container>
          <v-text-field
            v-model="cups"
            label="CUPS"
            :rules="cupsRules"
            hide-details="auto"
          ></v-text-field>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="success"
              variant="tonal"
              type="submit"
              :disabled="!valid"
              form="check-form"
            >
              Check
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-form>
      <div v-if="getResult">
        <v-row>
          <v-col cols="12" sm="6">
            <v-list lines="one">
              <v-list-item
                v-for="(key, value) in client"
                :key="key"
                :title="key"
                :subtitle="value"
              ></v-list-item>
            </v-list>
          </v-col>
          <v-col cols="12" sm="6">
            <v-list lines="one">
              <v-list-item
                v-for="(key, value) in supplyPoint"
                :key="key"
                :title="key"
                :subtitle="value"
              ></v-list-item>
            </v-list>
          </v-col>
        </v-row>
        <v-card-text>
          {{ getResult }}
        </v-card-text>
      </div>
    </v-card>
  </v-parallax>
</template>

<style scoped>
.card-form {
  border-radius: 10px;
  margin: 12vh;
}
</style>

<script lang="ts">
import { Client, SupplyPoint } from "@/domain/entities";
import { GetClientOffer } from "@/application/usercases";
import {
  ClientRepositoryImplementation,
  SupplyPointRepositoryImplementation,
} from "@/infrastructure/repositories";
import { defineComponent } from "vue";

export default defineComponent({
  name: "LandingTop",
  data: () => ({
    valid: true,
    cups: "",
    result: "",
    client: {} as Client | null,
    supplyPoint: {} as SupplyPoint | null,
    cupsRules: [
      (v: string) => !!v || "CUPS is required",
      (v: string) => (v && v.length === 6) || "CUPS must be 6 characters",
    ],
  }),
  methods: {
    async submitHandler() {
      this.client = await ClientRepositoryImplementation.getById(this.cups);
      this.supplyPoint = await SupplyPointRepositoryImplementation.getById(
        this.cups
      );

      // I am getting all supply points on the json file, it is not the best approach,
      // I should get only the supply points which neighbors was incluided the client cups (should be on api logic and you set a filter as parameter)
      // Instead of that, I put that logic on domain layer (getDiscount)
      const allSupplyPoints =
        await SupplyPointRepositoryImplementation.getAll();

      if (this.client && this.supplyPoint) {
        this.result = GetClientOffer(
          this.client,
          this.supplyPoint,
          allSupplyPoints
        );
      }

      // this.result = "You have the possibility to enroll! You get a discount of 5%!";
      // this.result = "You have the possibility to enroll! You get a discount of 15%!";
      // this.result = "You have the possibility to enroll!";
      // this.result = "Sorry, you are not elegible to enroll on this program.";
    },
  },
  computed: {
    getResult(): string {
      return this.result;
    },
    getClient(): Client | null {
      return this.client;
    },
    getSupplyPoint(): SupplyPoint | null {
      return this.supplyPoint;
    },
  },
});
</script>
