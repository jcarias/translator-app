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
        reject(res.error);
      }

      resolve(res.body);
    });
  });
