// Разбей задание на несколько подзадач:

// Создание и рендер разметки по массиву данных galleryItems из app.js и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image.Это необходимо для того,
// чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

// Следующий функционал не обязателен при сдаче задания, но будет хорошей практикой по работе с событиями.

// Закрытие модального окна по клику на div.lightbox__overlay.
// Закрытие модального окна по нажатию клавиши ESC.
// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

import galleryItems from './app.js';
//refs
const galleryCollection = document.querySelector('.js-gallery')
const galleryModalWindow = document.querySelector('.js-lightbox')
const removeSrcImg = galleryModalWindow.querySelector('.lightbox__image')
const overlayLink = galleryModalWindow.querySelector('.lightbox__overlay')
const btnLink = galleryModalWindow.querySelector('.lightbox__button')

const cardsImag = createImag(galleryItems);

galleryCollection.insertAdjacentHTML('beforeend', cardsImag);

function createImag(galleryItems) {
  
  return galleryItems
    .map(({ preview, original, description }) =>
      `<li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
        
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>`
    ).join("");

}

galleryCollection.addEventListener('click', evt => {
  if (evt.target.nodeName !== 'IMG') {
    return
  }
  galleryModalWindow.classList.add('is-open')
  evt.preventDefault();//отмена перехода по link
  const linkCurrent = evt.target.dataset.source
  const altCurrent = evt.target.alt
  removeSrcImg.src = `${linkCurrent}`
  removeSrcImg.alt = `${altCurrent}`
  
  
})
btnLink.addEventListener('click', evt => {
  galleryModalWindow.classList.remove('is-open')
  removeSrcImg.src = ''
  removeSrcImg.alt = ''
})

overlayLink.addEventListener('click', evt => {
  if (evt.currentTarget===evt.target) {
   galleryModalWindow.classList.remove('is-open')
 }
})
