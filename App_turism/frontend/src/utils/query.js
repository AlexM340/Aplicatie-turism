export const query = (query, params, method = "POST") => {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:5000/${query}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: method === "GET" ? undefined : JSON.stringify(params || {}),
      })
        .then(deserialize)
        .then((data) => resolve(data))
        .catch((err) => {
          console.log("In catch");
          console.log(err);
          reject(err);
        });
    });
  };
  
  const deserialize = async (response) => {
    const contentType = response.headers.get("content-type");
    // console.log("In deserialize", contentType,response);
    if (!response.ok) {
      console.error("Eroare în deserialize. Răspunsul nu a fost ok");
      throw new Error(
        (contentType?.includes("application/json")
          ? await response.json()
          : await response.text()) || response.statusText
      );
    }
    if (contentType?.includes("application/json")) return await response.json();
    if (contentType?.includes("text/plain")) return await response.text();
    console.error("Eroare în deserialize. Content type necunoscut.");
    throw new Error(`Content type necunoscut: ${contentType}`);
  };
  