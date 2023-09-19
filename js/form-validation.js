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
function defaultValue() {
  text_hashtags.value = "";
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

  if (isEmpty(inputValue)) {
    //проверка на пустую строку
    defaultValue();
  } else {
    if (inputValueArray.length > maxHashTagsAmount) {
      // проверка на колличество хештегов не более 5
      defaultValue();
    } else {
      inputValueArray.forEach((hashTag) => {
        if (hashTag.length > hashTagLenght) {
          correctTagLenght = false;
        }
      });
      if (!correctTagLenght) {
        // проверка на длину хештега не более 20 символов
        defaultValue();
      } else {
        inputValueArray.forEach((hashTag) => {
          if (!isCorrectHash(hashTag)) {
            // проверяем по регулярному выражению
            correctHash = false;
          }
        });
        if (!correctHash) {
          defaultValue();
        } else {
          //проверка на наличие дубликатов
          if (hasDuplicates(arr)) {
            defaultValue();
          } else {
            console.log("Validation is ok");
          }
        }
      }
    }
  }
}
text_hashtags.addEventListener("change", hashtagsValidation);

//coomment validation

function commentValidation(event) {
  const maxlenght = 140;
  const comment = event.target.value;

  if (comment.length > maxlenght) {
    text_description.value = '';
  }
}
text_description.addEventListener("change", commentValidation)

function handleFormSubmit() {
  //fields for sending to server
}

uploadPictureForm.addEventListener("submit", handleFormSubmit);
