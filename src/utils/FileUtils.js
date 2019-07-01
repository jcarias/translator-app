export const localizationParser = (locale, file) =>
  new Promise(async (resolve, reject) => {
    try {
      let data = { locale: locale, localizationStrings: {} };
      let fileData = await loadLocalFile(file).then(data => data);
      console.log(fileData);
      data.localizationStrings = fileData;
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });

export const loadLocalFile = file =>
  new Promise((resolve, reject) =>
    fetch(URL.createObjectURL(file))
      .then(res => res.json())
      .then(data => {
        resolve(data);
      })
      .catch(error => reject(error))
  );
