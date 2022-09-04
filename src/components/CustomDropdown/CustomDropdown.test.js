import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import CustomDropdown from "./CustomDropdown";

it("Test custom dropdown", () => {
  const selectedOption = "House";

  const setSelectedOption = jest.fn();

  const options = ["House", "R & B", "Rock", "Pop"];

  const { getByTestId, getByText } = render(
    <CustomDropdown
      placeholder="Category"
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
      options={options}
    />
  );

  expect(getByTestId("selected-option")).toHaveTextContent(selectedOption);
  const button = getByText("Category");

  fireEvent.click(button, { bubbles: true });
  const item = getByTestId("item-0");
  expect(item).toBeInTheDocument();

  fireEvent.click(item, { bubbles: true });

  expect(setSelectedOption).toHaveBeenCalledTimes(1);
});
