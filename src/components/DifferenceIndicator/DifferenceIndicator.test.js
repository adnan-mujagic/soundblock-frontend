import { render } from "@testing-library/react";
import colors from "../../utils/colors";
import DifferenceIndicator from "./DifferenceIndicator";

it("Test difference indicator with changes", () => {
  const current = {
    username: "adnanmujagic",
  };

  const next = {
    username: "adnan_mujagic",
  };

  const { getByTestId } = render(
    <DifferenceIndicator current={current} next={next} />
  );

  expect(getByTestId("difference-indicator")).toBeInTheDocument();

  const changeLineForUsername = getByTestId("change-line-username");
  expect(changeLineForUsername).toBeInTheDocument();

  expect(changeLineForUsername).toHaveStyle({
    "background-color": colors.lightgreen,
  });
});

it("Test difference indicator without changes", () => {
  const current = {
    username: "adnanmujagic",
  };

  const next = current;

  const { getByTestId } = render(
    <DifferenceIndicator current={current} next={next} />
  );

  expect(getByTestId("difference-indicator")).toBeInTheDocument();

  const changeLineForUsername = getByTestId("change-line-username");
  expect(changeLineForUsername).toBeInTheDocument();

  expect(changeLineForUsername).toHaveStyle({
    "background-color": "white",
  });
});
