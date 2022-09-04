import { render } from "@testing-library/react";
import CustomButtonFilled from "./CustomButtonFilled";

it("Test custom button", () => {
  const onClick = jest.fn();
  const { getByTestId } = render(
    <CustomButtonFilled onClick={onClick} text="Hello" disabled={false} />
  );

  const button = getByTestId("custom-button");
  expect(button).toHaveTextContent("Hello");
  expect(onClick).toHaveBeenCalledTimes(0);
  button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  expect(onClick).toHaveBeenCalledTimes(1);
});
