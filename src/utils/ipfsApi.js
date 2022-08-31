export const ipfsGatewayBaseUrl = "https://aldin-sxr.dev/ipfs";

export default async function upload(file) {
  const authorization = "Bearer 9z5jtQjkmh2nRfFzHZ6Zt7G5";
  let url = `${ipfsGatewayBaseUrl}/upload`;
  console.log("Fetching from this url: " + url);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
      body: { file: file },
    });
    const results = await response.json();
    console.log(results);
    return results;
  } catch (error) {
    console.log(error);
  }
}
