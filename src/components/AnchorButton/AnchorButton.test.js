import React from "react";
import { render } from "@testing-library/react";
import AnchorButton from "./AnchorButton";

it("Test anchor button", () => {
  const { getByTestId } = render(
    <AnchorButton text={"Test Link"} link="https://google.com" />
  );
  const anchorButton = getByTestId("anchor-button");
  expect(anchorButton).toHaveTextContent("Test Link");
  expect(anchorButton).toHaveAttribute("href", "https://google.com");
  expect(anchorButton).toHaveAttribute("target", "_blank");
});
