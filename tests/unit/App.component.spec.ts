import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";
import { MainPage } from "@/infrastructure/ui/pages";

describe("App", () => {
  it("renders MainPage component", () => {
    const wrapper = shallowMount(App);
    expect(wrapper.findComponent(MainPage).exists()).toBe(true);
  });
});
