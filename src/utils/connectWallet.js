import { ethers } from "ethers";

export default async function connect() {
  console.log("I happened");
  if (!window.ethereum) return;
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    return {
      provider,
      signer,
    };
  } catch (error) {
    console.error("Something unexpected happened", error);
  }
}
