const uploadPictureForm = document.getElementById("upload-select-image");
const configPictureForm = document.querySelector(".img-upload__overlay");
const fileInput = document.getElementById("upload-file");
const text_hashtags = document.querySelector(".text__hashtags");
const text_description = document.querySelector(".text__description");

//загружаем только одну картинку и проверяем!
function pictureFileValidation(event) {
  const pictureType = event.target.files[0].type;
  if (pictureType == "image/jpeg" || pictureType == "image/png") {
    configPictureForm.classList.remove("hidden");
  } else alert("It is not a Picture, please try again!");
}
fileInput.addEventListener("change", pictureFileValidation);

//проверяем значение инпута хештега на пустую строку (пробелы)
function isEmpty(str) {
  if (str.trim().length === 0) {
    return true;
  }
  return false;
}
//возвращаем значение по умолчанию для инпута хеш-тега
function defaultValue(field) {
  field.value = "";
}
//отображение ошибки
function validationError(field, errorText) {
  field.setCustomValidity(errorText);
}
//проверяем с регулярным выражением
function isCorrectHash(str) {
  const regExpr = /^#[0-9A-ZА-ЯЁ]+$/i;
  return regExpr.test(str);
}
//проверка на дубликаты
function hasDuplicates(arr) {
  return new Set(arr).size !== arr.length;
}

function hashtagsValidation(event) {
  //значение инпут
  let inputValue = event.target.value;
  const inputValueArray = inputValue.toLowerCase().split(" ");
  const maxHashTagsAmount = 5;
  const hashTagLenght = 20;
  let correctTagLenght = true;
  let correctHash = true;

  const error = {
    error_empty: "Field is empty, add some letters",
    error_limit: "no more than 5 hastags",
    error_letter_limit: "no more that 20 letters per hastag",
    error_regular: "regulae expression error",
    error_diplicates: "delete diplicates",
  };

  if (isEmpty(inputValue)) {
    defaultValue(text_hashtags);
    validationError(text_hashtags, error.error_empty);
    return console.log(error.error_empty);
  }

  if (inputValueArray.length > maxHashTagsAmount) {
    // проверка на колличество хештегов не более 5
    defaultValue(text_hashtags);
    validationError(text_hashtags, error.error_limit);
    return console.log(error.error_limit);
  }

  inputValueArray.forEach((hashTag) => {
    if (hashTag.length > hashTagLenght) {
      correctTagLenght = false;
    }
  });

  if (!correctTagLenght) {
    // проверка на длину хештега не более 20 символов
    defaultValue(text_hashtags);
    validationError(text_hashtags, error.error_letter_limit);
    return console.log(error.error_letter_limit);
  }

  inputValueArray.forEach((hashTag) => {
    if (!isCorrectHash(hashTag)) {
      correctHash = false;
    }
  });
  // проверяем по регулярному выражению
  if (!correctHash) {
    defaultValue(text_hashtags);
    validationError(text_hashtags, error.error_regular);
    return console.log(error.error_regular);
  }
  if (hasDuplicates(arr)) {
    defaultValue(text_hashtags);
    validationError(text_hashtags, error.error_diplicates);
    return console.log(error.error_diplicates);
  }

}
text_hashtags.addEventListener("change", hashtagsValidation);

//coomment validation

function commentValidation(event) {
  const maxlenght = 140;
  const comment = event.target.value;
  const error = "no more than 140 symbl"

  if (comment.length > maxlenght) {
    defaultValue(text_description);
    validationError(text_description, error);
  }
}
text_description.addEventListener("change", commentValidation);

function handleFormSubmit() {
  //fields for sending to server
}

uploadPictureForm.addEventListener("submit", handleFormSubmit);
