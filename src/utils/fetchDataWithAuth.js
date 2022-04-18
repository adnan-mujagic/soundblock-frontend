import SessionStorage from "./SessionStorage";

export default async function fetchDataWithAuth(urlSuffix, method, body) {
  let url = `https://soundblock.herokuapp.com/api${urlSuffix}`;

  console.log("Fetching from this url: " + url);
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: SessionStorage.getToken(),
      },
      body: JSON.stringify(body),
    });
    const results = await response.json();
    console.log(results);
    return results;
  } catch (error) {
    console.log(error);
  }
}
