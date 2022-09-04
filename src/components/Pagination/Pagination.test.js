import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Pagination from "./Pagination";

const setup = (totalItems = 5, page = 1) => {
  const setPage = jest.fn();
  const utils = render(
    <Pagination totalItems={totalItems} page={page} setPage={setPage} />
  );
  const pagination = utils.queryByTestId("pagination");

  const controls = ["first", "previous", "next", "last"].map((control) =>
    utils.queryByTestId(`${control}-page-icon-button`)
  );

  return {
    ...utils,
    setPage,
    pagination,
    controls,
  };
};

it("Test pagination not shown when there is only one page", () => {
  const { pagination } = setup();
  expect(pagination).not.toBeInTheDocument();
});

it("Test pagination shown when there are multiple pages", async () => {
  const { setPage, pagination, controls } = setup(25, 3);

  expect(pagination).toBeInTheDocument();

  // Test first page
  fireEvent.click(controls[0], { bubbles: true });
  expect(setPage).toHaveBeenCalledWith(1);

  // Test previous page
  fireEvent.click(controls[1], { bubbles: true });
  expect(setPage).toHaveBeenCalledWith(2);

  // Test next page
  fireEvent.click(controls[2], { bubbles: true });
  expect(setPage).toHaveBeenCalledWith(4);

  // Test last page
  fireEvent.click(controls[3], { bubbles: true });
  expect(setPage).toHaveBeenCalledWith(5);
});

it("Test first and previous page controls disabled", () => {
  const { controls } = setup(10, 1);

  expect(controls[0]).toBeDisabled();
  expect(controls[1]).toBeDisabled();
});

it("Test next and last page disabled", () => {
  const { controls } = setup(10, 2);

  expect(controls[2]).toBeDisabled();
  expect(controls[3]).toBeDisabled();
});
