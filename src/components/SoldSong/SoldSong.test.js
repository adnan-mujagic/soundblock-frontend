import { render } from "@testing-library/react";
import SoldSong from "./SoldSong";

it("Test sold song", () => {
  const soldItem = {
    song: {
      image: "some_image.jpg",
    },
    count: 3,
    totalEarned: 15,
  };

  const { getByTestId } = render(<SoldSong soldItem={soldItem} />);

  expect(getByTestId("number-of-sales")).toHaveTextContent("3");

  expect(getByTestId("total-earned")).toHaveTextContent("15");
});
