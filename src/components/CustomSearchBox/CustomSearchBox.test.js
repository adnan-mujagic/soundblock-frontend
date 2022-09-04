import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import CustomSearchBox from "./CustomSearchBox";

it("Test custom search box", () => {
  const setData = jest.fn();
  const setTotal = jest.fn();
  const page = 1;
  const setPage = jest.fn();
  const limit = 10;

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeUser),
    })
  );

  const { getByTestId } = render(
    <CustomSearchBox
      setData={setData}
      setTotal={setTotal}
      page={page}
      setPage={setPage}
      limit={limit}
    />
  );

  const textField = getByTestId("text-field");

  expect(textField).toBeInTheDocument();
});
