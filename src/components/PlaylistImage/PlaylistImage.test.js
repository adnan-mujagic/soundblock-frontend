import { render } from "@testing-library/react";
import PlaylistImage from "./PlaylistImage";

const setup = (songImages) => {
  const { getAllByTestId } = render(<PlaylistImage songImages={songImages} />);

  const fractions = getAllByTestId(/fraction-/i);
  return fractions;
};

it("Test playlist image composition when there are no song images", () => {
  const songImages = [];

  const fractions = setup(songImages);

  expect(fractions.length).toBe(1);
});

it("Test playlist image composition when there are less than 4 songs", () => {
  const songImages = ["song_1.jpg", "song_2.jpg", "song_3.jpg"];

  const fractions = setup(songImages);

  expect(fractions.length).toBe(1);
});

it("Test playlist image composition when there are 4 or more songs", () => {
  const songImages = ["song_1.jpg", "song_2.jpg", "song_3.jpg", "song_4.jpg"];

  const fractions = setup(songImages);

  expect(fractions.length).toBe(4);
});
