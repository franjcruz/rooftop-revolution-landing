import { shallowMount } from "@vue/test-utils";
import { RRFooter } from "@/infrastructure/ui/components";

describe("RRFooter", () => {
  it("renders footer content correctly", () => {
    const wrapper = shallowMount(RRFooter);
    const footerContent = wrapper.find(".pt-0").text();
    expect(footerContent).toContain("Phasellus feugiat arcu sapien");
  });

  it("displays the current year and author name", () => {
    const wrapper = shallowMount(RRFooter);
    const year = new Date().getFullYear();
    const author = wrapper.find("strong").text();
    expect(wrapper.text()).toContain(year.toString());
    expect(wrapper.text()).toContain(author);
  });
});
