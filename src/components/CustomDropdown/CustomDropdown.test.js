import { render } from "@testing-library/react";
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

  expect(getByTestId("selected-option")).toHaveTextContent(options[0]);
  const button = getByText("Category");

  act(() => {
    button.click();
  });
  let item = getByTestId("item-0");
  expect(item).toBeInTheDocument();

  act(() => {
    item.click();
  });

  expect(setSelectedOption).toHaveBeenCalledTimes(1);
});
