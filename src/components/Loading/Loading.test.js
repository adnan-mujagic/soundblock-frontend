import { render } from "@testing-library/react";
import Loading from "./Loading";

it("Test loading", () => {
  const { getByTestId } = render(<Loading />);

  expect(getByTestId("loading")).toBeInTheDocument();
});
