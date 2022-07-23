import { ethers } from "ethers";

export default async function connect() {
  if (!window.ethereum) {
    throw new Error("Metamask required");
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  return {
    provider,
    signer,
  };
}

export const contractAddress = "0x71b386fb4Df9E5D6f84A04F5362Da86E03a89Fd1";
