import galleryImages from './gallery-items.js';

const galleryEl = document.querySelector('.gallery.js-gallery');

//Вариант 1
const createGallerymarkUp = galleryMarkup(galleryImages);
galleryEl.insertAdjacentHTML('beforeend', createGallerymarkUp);

function galleryMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item"><a class = "gallery__link" href="${original}"><img class="gallery__image" src=${preview} data-source=${original} alt=${description}/></a></li>`;
    })
    .join('');
}

// Вариант 2
/*const galleryMarkup = ({ preview, original, description }) => {
  const liEl = document.createElement('li');
  liEl.classList.add('gallery__item');

  const aEl = document.createElement('a');
  aEl.classList.add('gallery__link');
  aEl.href = `${original}`;

  const imgEl = document.createElement('img');
  imgEl.classList.add('gallery__image');
  imgEl.src = `${preview}`;
  imgEl.setAttribute('data-source', `${original}`);
  imgEl.alt = `${description}`;

  aEl.append(imgEl);
  liEl.append(aEl);

  return liEl;
};

const gallery = galleryImages.map(galleryMarkup);

galleryEl.append(...gallery);*/

//-----------------------------------
/* Шаблон li-шки
<li class="gallery__item">
  <a
    class="gallery__link"
    href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  >
    <img
      class="gallery__image"
      src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
      data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
      alt="Tulips"
    />
  </a>
</li>
 */
