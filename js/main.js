// функция для получения случайного числа от 15 до 200
let randomInt = () => {
  let r = 0;
  while (r < 15) {
    r = Math.floor(Math.random() * 200);
  }
  return r;
};

// функция для получения массива коментариев
let randomComments = () => {
  let arr = [];
  let getId = () => {
    let r = Math.floor(Math.random() * 200);
    return r;
  };

  let comments = [
    "Все відмінно!",
    "Загалом все непогано. Але не всі.",
    "Коли ви робите фотографію, добре б прибирати палець із кадру. Зрештою, це просто непрофесійно.",
    "Моя бабуся випадково чхнула з фотоапаратом у руках і у неї вийшла фотографія краща.",
    "Я послизнувся на банановій шкірці і впустив фотоапарат на кота і у мене вийшла фотографія краще.",
    "Обличчя людей на фотці перекошені, ніби їх побивають. Як можна було зловити такий невдалий момент?",
  ];

  let names = ["Яйцеслав", "Педуард", "Синий", "Просто Толик"];

  for (let index = 0; index < Math.floor(Math.random() * 10); index++) {
    let id = getId();

    for (let a = 0; a <= arr.length; a++) {
      if (arr.length != 0) {
        try {
          if (arr[a].id == id) {
            id = getId();
          }
        } catch {}
      }
    }
    const element = {
      id: id,
      avatar: `img/avatar-${Math.floor(Math.random() * 6)}.jpg`,
      message: comments[Math.floor(Math.random() * comments.length)],
      name: names[Math.floor(Math.random() * names.length)],
    };
    arr.push(element);
  }
  return arr;
};

// инициализация массива под фото
function arrayInit() {
  let arr = [];
  for (let index = 0; index < 25; index++) {
    let likes = randomInt();
    const element = {
      id: index + 1,
      url: `photos/${index + 1}.jpg`,
      description: "some description here!",
      likes: likes,
      comments: randomComments(),
    };
    arr.push(element);
  }
  return arr;
}

//експорт
export let mockArray = arrayInit();
console.log(mockArray);
