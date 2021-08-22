// Разбей задание на несколько подзадач:

// Создание и рендер разметки по массиву данных galleryItems из app.js и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image.Это необходимо для того,
// чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.



import galleryItems from './app.js';
console.log(galleryItems);
const galleryCollection = document.querySelector('.js-gallery')
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
  const linkCurrent = evt.target
  
})