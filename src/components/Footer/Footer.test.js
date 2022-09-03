import React from "react";
import Footer from "./Footer";

import { render } from "@testing-library/react";

it("Test rendering of the footer", () => {
  const { getByTestId } = render(<Footer />);
  expect(getByTestId("footer")).toHaveTextContent("Adnan Mujagic");
  expect(getByTestId("footer")).toHaveTextContent("Rattle");
});
