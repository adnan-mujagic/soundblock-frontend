import { render } from "@testing-library/react";
import EmptyContent from "./EmptyContent";

it("Test empty content component", () => {
  const message = "Oops... nothing to see here";
  const { getByTestId } = render(
    <EmptyContent message={message} isAnimated={true} />
  );

  expect(getByTestId("empty-content-message")).toHaveTextContent(message);
});
