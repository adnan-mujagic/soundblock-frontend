import { render } from "@testing-library/react";
import Badge from "./Badge";

it("Test badge component", () => {
  const { getByText } = render(
    <Badge
      title="Test badge"
      link="https://github.com/"
      backgroundColor={"black"}
    />
  );

  expect(getByText("Test badge")).toHaveStyle({
    "background-color": "black",
  });
});
