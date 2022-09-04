import { render, fireEvent } from "@testing-library/react";
import CustomTextField from "./CustomTextField";

it("Test custom text field", () => {
  const text = "John";
  const setText = jest.fn();
  const testId = "custom-text-field";
  const { getByTestId } = render(
    <CustomTextField
      placeholder="Name..."
      variant="outlined"
      text={text}
      setText={setText}
      testId={testId}
    />
  );

  const input = getByTestId(testId).querySelector("input");
  expect(input).toBeInTheDocument();
  expect(input.value).toBe("John");
  fireEvent.change(input, { target: { value: "Doe" } });
  expect(setText).toHaveBeenCalledWith("Doe");
});
