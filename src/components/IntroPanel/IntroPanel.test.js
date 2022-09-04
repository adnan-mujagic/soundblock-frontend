import { render } from "@testing-library/react";
import IntroPanel from "./IntroPanel";

it("Test intro panel", () => {
  const { getByTestId } = render(
    <IntroPanel
      title="Title"
      text="This is some section"
      imageUrl="some_image.jpg"
    />
  );

  const introPanel = getByTestId("intro-panel");

  expect(introPanel).toBeInTheDocument();
  expect(introPanel).toHaveStyle({ "flex-direction": "row" });

  expect(getByTestId("intro-panel-image")).toHaveStyle({
    "background-image": "url(some_image.jpg)",
  });
});
