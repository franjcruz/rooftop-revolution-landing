import { shallowMount } from "@vue/test-utils";
import { RRHeader } from "@/infrastructure/ui/components";

describe("RRHeader", () => {
  it("renders the header title correctly", () => {
    const wrapper = shallowMount(RRHeader);
    const headerTitle = wrapper.find(".header-title");
    expect(headerTitle.exists()).toBe(true);
    expect(headerTitle.text()).toBe("Rooftop Revolution");
  });

  it("renders the About us button correctly", () => {
    const wrapper = shallowMount(RRHeader);
    const aboutUsButton = wrapper.find("#about");
    expect(aboutUsButton.text()).toBe("About us");
  });

  it("renders the Contact button correctly", () => {
    const wrapper = shallowMount(RRHeader);
    const contactButton = wrapper.find("#contact");
    expect(contactButton.text()).toBe("Contact");
  });
});
