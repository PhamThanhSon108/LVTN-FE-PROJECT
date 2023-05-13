export const convertFileToBase64 = (file, handleCallAPI) => {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    handleCallAPI(reader.result);
  };
  reader.onerror = function (error) {};
};

export const convertFilesToBase64 = async (files, handleCallAPI, handleAfterConvert) => {
  let newListBase64 = [];

  for (const file of files) {
    const base64 = await readFileAsBase64(file);
    newListBase64.push(base64);
    handleCallAPI(base64);
  }

  handleAfterConvert(newListBase64);

  return newListBase64;
};

const readFileAsBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function () {
      resolve(reader.result);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};
