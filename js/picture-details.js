import { photos } from "./main.js";

// определяем поля
const body  = document.querySelector('.body');
const pictures = document.querySelectorAll('.picture');
const big_picture = document.querySelector('.big-picture')
const picture_wrapper = document.querySelector('.big-picture__img');
const picture_likes = document.querySelector('.likes-count');
const picture_comments = document.querySelector('.comments-count');
const picture_cancel = document.querySelector('#picture-cancel');
const template_comment = document.querySelector("#social__comment");
const social_comments = document.querySelector('.social__comments');
const def_comment = document.querySelector('.social__comment');

// создаем клон одного комментария
function getComment(data) {
    //делаем клон и определяем поля
    const comment = template_comment.content.cloneNode(true);
    const social_author = comment.querySelector('.social__author');
    const social_text = comment.querySelector('.social__text');
    const social_picture = comment.querySelector('.social__picture');
    //указываем значения переданные в функцию
    social_author.textContent = data.name;
    social_text.textContent = data.message;
    social_picture.src = data.avatar;

    return comment;
}

// получаем список комментариев из пришедшего массива 
function getComments(dataArr) {
    let comments = new DocumentFragment();
    for (let index = 0; index < dataArr.length; index++) {
        comments.append(getComment(dataArr[index]));
    }
    return comments;
}

//получаем нужный обьект из массива данных и перезаписываем переменные согласно полученному id
function getPictureInfo(id) {
    for (let index = 0; index < photos.length; index++) {
        // если поставить в if === код не работает! Почему?
        if (photos[index].id==id) {
            for (const child of picture_wrapper.children) {
                child.src = photos[index].url;
            }
            picture_likes.textContent = photos[index].likes;
            picture_comments.textContent = photos[index].comments.length;
            social_comments.append(getComments(photos[index].comments));
        }
    }
}

//открывем картику, проверяем наличие класса hidden, затем убирем класс hidden, после чего обновляем данные по id
pictures.forEach(pic => {
    pic.addEventListener('click', (e) => {
      if (big_picture.classList.contains("hidden")) {
        big_picture.classList.remove("hidden");
        body.classList.add("modal-open")
        def_comment.remove();
        getPictureInfo(e.target.dataset.id);
      }
    });
});

//закрываем окно по клику на крестик
picture_cancel.addEventListener('click', () => {
    big_picture.classList.add("hidden");
    body.classList.remove("modal-open");
});
//закрываем окно по нажатию на esc
document.addEventListener('keydown', (e) => {
    if (e.keyCode === 27) {
        big_picture.classList.add("hidden");
        body.classList.remove("modal-open");
    }
})