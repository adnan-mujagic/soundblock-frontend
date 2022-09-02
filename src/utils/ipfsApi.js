export const ipfsGatewayBaseUrl = "https://aldin-sxr.dev/ipfs";

export default async function upload(file) {
  const authorization = "Bearer 9z5jtQjkmh2nRfFzHZ6Zt7G5";
  let url = `${ipfsGatewayBaseUrl}/upload`;
  console.log("Fetching from this url: " + url);
  let body = new FormData();
  body.append('file', file);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: authorization,
      },
      body: body,
    });
    const results = await response.json();
    console.log(results);
    return results;
  } catch (error) {
    console.log(error);
  }
}
