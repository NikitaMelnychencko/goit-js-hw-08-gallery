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
const arrLink = galleryCollection.querySelectorAll('.gallery__image')
let arr = {
  value: 0,
  min: 1,
  max: 8,
  increment() {
    if (this.value < this.max) {
      this.value += 1;
    }
  },
  decrement() {
    if (this.value > this.min)
      this.value -= 1;
  }
}
galleryCollection.addEventListener('click', evt => {
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return
  }
  modalOpen('is-open')
  renderImgFirst(evt)
  window.addEventListener('keydown', onEscKeyPress)
  
  const valueIndex = arrLink.forEach((currentValue, index, array) => {
    if (evt.target.alt === currentValue.alt) {
      arr.value=index
  }})

})

btnLink.addEventListener('click', evt => {
  window.removeEventListener('keydown', onEscKeyPress)
  modalClose('is-open')
  
})

overlayLink.addEventListener('click', evt => {
  if (evt.currentTarget === evt.target) {
    window.removeEventListener('keydown', onEscKeyPress)
    modalClose('is-open')
  }
})


function onEscKeyPress(evt) {
  if (evt.code==='Escape') {
  modalClose('is-open') 
  }
  
  if (evt.code === 'ArrowRight') {
    arr.increment()
    renderImgSecond(arrLink[arr.value])
  }
  if (evt.code==='ArrowLeft') {
    arr.decrement()
    renderImgSecond(arrLink[arr.value])
  }
}

function modalOpen(value) {
  galleryModalWindow.classList.add(value)
}
function renderImgFirst(refs) {
  const linkCurrent = refs.target.dataset.source
  const altCurrent = refs.target.alt

  removeSrcImg.src = `${linkCurrent}`
  removeSrcImg.alt = `${altCurrent}`
}
function renderImgSecond(refs) {
  const linkCurrent = refs.dataset.source
  const altCurrent = refs.alt

  removeSrcImg.src = `${linkCurrent}`
  removeSrcImg.alt = `${altCurrent}`
}
function modalClose(value) {
  galleryModalWindow.classList.remove(value)
  removeSrcImg.src = ''
  removeSrcImg.alt = ''

}
