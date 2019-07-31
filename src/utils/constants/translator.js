import unirest from "unirest";

export const translate = (sourceLanguage, targetLanguage, text) =>
  new Promise((resolve, reject) => {
    let req = unirest(
      "GET",
      "https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/translation/text/translate"
    );

    req.query({
      source: sourceLanguage,
      target: targetLanguage,
      input: text
    });

    req.headers({
      "x-rapidapi-host":
        "systran-systran-platform-for-language-processing-v1.p.rapidapi.com",
      "x-rapidapi-key": "4c46372de7msh56f946b1e958e98p12659bjsna7340c323ac0"
    });

    req.end(function(res) {
      if (res.error) {
        console.error("UPS there was an error: ", res.error);
        reject(res.error);
      }

      resolve(res.body);
    });
  });

export const translateV2 = (sourceLanguage, targetLanguage, text) => {
  const url = `https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/translation/text/translate?source=${sourceLanguage}&target=${targetLanguage}&input=${text}`;

  return fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      "x-rapidapi-host":
        "systran-systran-platform-for-language-processing-v1.p.rapidapi.com",
      "x-rapidapi-key": "4c46372de7msh56f946b1e958e98p12659bjsna7340c323ac0"
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer" // no-referrer, *client
  }).then(response => response.json());
};
