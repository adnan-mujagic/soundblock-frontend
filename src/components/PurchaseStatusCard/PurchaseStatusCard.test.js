import { render } from "@testing-library/react";
import colors from "../../utils/colors";
import PurchaseStatusCard from "./PurchaseStatusCard";

const setup = (status) => {
  const { getByTestId } = render(
    <PurchaseStatusCard purchase={getPurchaseWithStatus(status)} />
  );
  const indicator = getByTestId("purchase-status-indicator");
  return indicator;
};

const getPurchaseWithStatus = (status) => {
  return {
    status,
    song: {
      name: "Faded",
      price: 0.001,
    },
    purchaseTransactionLink: "somewhere/on/etherscan.io",
    ownerTransactionLink: "also/on/etherscan.io",
  };
};

it("Test purchase status card when successful", () => {
  const indicator = setup("SUCCESSFUL");

  expect(indicator).toHaveStyle({ color: colors.green });
});

it("Test purchase status card when pending", () => {
  const indicator = setup("PENDING");

  expect(indicator).toHaveStyle({ color: colors.warning });
});

it("Test purchase status card when failed", () => {
  const indicator = setup("ERROR");

  expect(indicator).toHaveStyle({ color: colors.error });
});
