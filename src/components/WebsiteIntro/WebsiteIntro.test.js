import { render } from "@testing-library/react";
import WebsiteIntro from "./WebsiteIntro";

it("Test website intro", () => {
  const { getAllByTestId } = render(<WebsiteIntro />);

  expect(getAllByTestId("intro-panel").length).toBe(5);
});
