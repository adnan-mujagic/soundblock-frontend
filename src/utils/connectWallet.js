import { ethers } from "ethers";

export default async function connect() {
  if (!window.ethereum) return;

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  return {
    provider,
    signer,
  };
}
