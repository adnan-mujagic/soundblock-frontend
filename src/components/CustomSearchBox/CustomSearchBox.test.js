import { fireEvent, render, waitFor } from "@testing-library/react";
import CustomSearchBox from "./CustomSearchBox";

it("Test custom search box", async () => {
  const setData = jest.fn();
  const setTotal = jest.fn();
  const page = 1;
  const setPage = jest.fn();
  const limit = 10;

  const response = {
    message: "Data retrieved successfully",
    data: [
      {
        price: 0.00321,
        name: "Faded",
        category: "House",
        artistAddress: "0xfFC3Ba11F5269835C939Fb54A31f458C3F9a900c",
        uploadStatus: "SUCCESSFUL",
        isPurchased: false,
      },
    ],
    count: 1,
  };

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(response),
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

  const searchInput = getByTestId("text-field").querySelector("input");

  expect(searchInput).toBeInTheDocument();

  fireEvent.change(searchInput, { target: { value: "Faded" } });

  await waitFor(() => {
    expect(setData).toHaveBeenCalledWith(response.data);
  });
});
