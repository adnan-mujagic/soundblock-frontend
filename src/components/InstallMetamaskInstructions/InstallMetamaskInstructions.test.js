import { render } from "@testing-library/react";
import InstallMetamaskInstructions from "./InstallMetamaskInstructions";

it("Test install metamask instructions dialog", () => {
  const setOpen = jest.fn();

  const { queryByText } = render(
    <InstallMetamaskInstructions open={true} setOpen={setOpen} />
  );

  const linkToMetamaskInstallationGuide = queryByText(
    /metamask installation guide/i
  );
  expect(linkToMetamaskInstallationGuide).toBeInTheDocument();

  expect(linkToMetamaskInstallationGuide).toHaveAttribute(
    "href",
    "https://metamask.io/"
  );
});
