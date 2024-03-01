import { createApp } from "vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";

import App from "./App.vue";

const app = createApp(App);

// I was looking for the component library. I found 'margarita' package.
// I tried to use Margarita but it doesn't work, I found the documentation https://holaluz.github.io/margarita/?path=/story/introduction-welcome--page
// but I can not access to the source code... I don't know if it requires some aditional configuration or something like that.
// import Margarita from "@holaluz/margarita";
// app.use(Margarita);

// As I can't use Margarita, I will use Vuetify
const vuetify = createVuetify({
  components,
  directives,
});

app.use(vuetify).mount("#app");
