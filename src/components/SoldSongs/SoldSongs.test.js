import { render, waitFor } from "@testing-library/react";
import SoldSongs from "./SoldSongs";

it("Test sold songs", async () => {
  const fakeResponse = {
    soldItems: [
      {
        count: 2,
        totalEarned: 3,
        song: {
          _id: "0",
          price: 1.5,
          name: "We Are",
        },
      },
    ],
    count: 2,
    message: "Data retrieved successfully",
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeResponse),
    })
  );

  const { getAllByTestId } = render(<SoldSongs />);

  await waitFor(() => {
    expect(getAllByTestId("sold-song").length).toBe(1);
  });
});
