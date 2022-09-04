import { render } from "@testing-library/react";
import CustomSlider from "./CustomSlider";

it("Test custom slider", () => {
  const value = 43;
  const onChange = jest.fn();
  const { getByTestId } = render(
    <CustomSlider value={value} onChange={onChange} />
  );

  expect(getByTestId("slider")).toBeInTheDocument();
});
