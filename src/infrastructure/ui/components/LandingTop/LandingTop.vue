<template>
  <v-parallax src="solar-power-rooftop.jpg" height="750">
    <v-card
      class="card-form align-middle float-end"
      width="600"
      max-height="800"
    >
      <v-card-title> {{ result || title }} </v-card-title>
      <v-card-text v-if="!result">
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
        </v-container>
      </v-form>
      <div v-if="result">
        <v-row>
          <v-col v-if="client" cols="12" sm="6">
            <client-list :client="client" />
          </v-col>
          <v-col v-if="supplyPoint" cols="12" sm="6">
            <supply-point-list :supplyPoint="supplyPoint" />
          </v-col>
        </v-row>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-if="!result"
          color="success"
          variant="tonal"
          type="submit"
          :disabled="!valid"
          form="check-form"
        >
          Check
        </v-btn>
        <v-btn v-if="result" variant="tonal" @click="resetHandler">
          Reset
        </v-btn>
      </v-card-actions>
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
import { defineComponent } from "vue";
import { Client, SupplyPoint } from "@/domain/entities";
import { GetClientOffer } from "@/application/usercases";
import {
  ClientRepositoryImplementation,
  SupplyPointRepositoryImplementation,
} from "@/infrastructure/repositories";
import { ClientList } from "../ClientList";
import { SupplyPointList } from "../SupplyPointList";

export default defineComponent({
  components: { ClientList, SupplyPointList },
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
    title: "Get enrolled with the rooftop revolution!",
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
        const keyResult = GetClientOffer(
          this.client,
          this.supplyPoint,
          allSupplyPoints
        );

        switch (keyResult) {
          case "NOT_ELIGIBLE":
            this.result =
              "Sorry, you are not elegible to enroll on this program.";
            break;
          case "STANDARD_OFFER":
            this.result = "You have the possibility to enroll!";
            break;
          case "BASIC_DISCOUNT":
            this.result =
              "You have the possibility to enroll! You get a discount of 5%!";
            break;
          case "SPECIAL_DISCOUNT":
            this.result =
              "You have the possibility to enroll! You get a discount of 15%!";
            break;
          default:
            break;
        }
      } else {
        this.result = "Sorry, we didn't found a client with this CUPS.";
      }
    },
    resetHandler() {
      this.result = "";
      this.cups = "";
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
