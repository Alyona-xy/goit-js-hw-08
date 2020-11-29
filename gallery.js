import gallery from "./gallery-items.js";
const galleryDOM = document.querySelector("ul.js-gallery");
const modal = document.querySelector(".js-lightbox");
let indexCurrentElement;
const renderGallery = function (array, ul) {
  /* создает разметку для галереи */
  let NodeList = gallery.map((value, index) => {
    let item = document.createElement("li");
    item.classList.add("gallery__item");
    let link = document.createElement("a");
    link.classList.add("gallery__link");
    link.setAttribute("href", value.original);
    let image = document.createElement("img");
    image.setAttribute("src", value.preview);
    image.setAttribute("alt", value.description);
    image.dataset.sourse = value.original;
    image.classList.add("gallery__image");
    image.dataset.index = index;
    link.appendChild(image);
    item.appendChild(link);

    return item;
  });

  galleryDOM.append(...NodeList);
};

const getItemfromDOMGallery = function (e) {
  e.preventDefault();
  if (e.target === e.currentTarget) {
    return;
  }
  modalIsOpen();
  changeImg(e.target.dataset.sourse);
};

const modalIsOpen = function () {
  modal.classList.add("is-open");
};

const modalIsClose = function () {
  modal.classList.remove("is-open");
  changeImg();
};

const changeImg = function (value) {
  let image = document.querySelector("img.lightbox__image");
  if (image.getAttribute("src") === value || !value) {
    image.setAttribute("src", "");
  } else {
    image.setAttribute("src", value);
  }
};

const checkModal = function (e) {
  if (e.target === document.querySelector(".lightbox__overlay")) {
    modalIsClose();
  }
  return;
};

renderGallery(gallery, galleryDOM);
galleryDOM.addEventListener("click", getItemfromDOMGallery);
document
  .querySelector('button[data-action="close-lightbox"]')
  .addEventListener("click", modalIsClose);
modal.addEventListener("click", checkModal);

