const likeCount = {
  min: 15,
  max: 200,
};

// функция для получения случайного числа от 15 до 200
function getRandomLikes() {
  let randomNum = 0;
  while (randomNum < likeCount.min) {
    randomNum = Math.floor(Math.random() * likeCount.max);
  }
  return randomNum;
}

// генерация Id для комментов
function getId() {
  return Math.floor(Math.random() * 200);
}

const comments = [
  "Все відмінно!",
  "Загалом все непогано. Але не всі.",
  "Коли ви робите фотографію, добре б прибирати палець із кадру. Зрештою, це просто непрофесійно.",
  "Моя бабуся випадково чхнула з фотоапаратом у руках і у неї вийшла фотографія краща.",
  "Я послизнувся на банановій шкірці і впустив фотоапарат на кота і у мене вийшла фотографія краще.",
  "Обличчя людей на фотці перекошені, ніби їх побивають. Як можна було зловити такий невдалий момент?",
];

const names = ["Яйцеслав", "Педуард", "Синий", "Просто Толик"];

// функция для получения массива коментариев
// data types
//привидение типов
//arguments functions
//functions types
//data types

//генерация коммента
function getComment(id) {
  return {
    id: id,
    avatar: `img/avatar-${Math.floor(Math.random() * 6)}.jpg`,
    message: comments[Math.floor(Math.random() * comments.length)],
    name: names[Math.floor(Math.random() * names.length)],
  };
}

//генерация массива комментов
function getRandomComments(comments, names) {
  const commentsList = [];

  for (let index = 0; index < Math.floor(Math.random() * 10); index++) {
    let id = getId();

    //проверяем есть ли сгенерированный id в массиве, если есть генерируем заново
    for (let a = 0; a <= commentsList.length; a++) {
      if (commentsList.length != 0) {
        if (commentsList[a]?.id === id) {
          id = getId();
        }
      }
    }
    commentsList.push(getComment(id));
  }
  return commentsList;
}

// инициализация фото
function getPhotos() {
  const photos = [];
  for (let index = 0; index < 25; index++) {
    photos.push({
      id: index + 1,
      url: `photos/${index + 1}.jpg`,
      description: "some description here!",
      likes: getRandomLikes(),
      comments: getRandomComments(comments, names),
    });
  }
  return photos;
}

//експорт
export const photos = getPhotos();
console.log(photos);
