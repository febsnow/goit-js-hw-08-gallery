import galleryImages from './gallery-items.js';

const body = document.querySelector('body');
const galleryEl = document.querySelector('.gallery.js-gallery');
const lightbox = document.querySelector('.lightbox.js-lightbox');
const lightboxImg = document.querySelector('.lightbox__image');

//Вариант создания разметки 1
const createGalleryMarkUp = galleryMarkup(galleryImages);
galleryEl.insertAdjacentHTML('beforeend', createGalleryMarkUp);

function galleryMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item"><a class = "gallery__link" href="${original}"><img class="gallery__image" src=${preview} data-source=${original} alt="${description}"/></a></li>`;
    })
    .join('');
}

// Вариант создания разметки 2
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
  imgEl.alt = "`${description}`";

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

galleryEl.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(evt) {
  evt.preventDefault();

  body.style.overflow = 'hidden';

  lightbox.classList.add('is-open');

  lightboxImg.src = evt.target.dataset.source;
  lightboxImg.alt = evt.target.alt;

  window.addEventListener('keydown', onWindowKeydown);

  function onWindowKeydown(evt) {
    if (evt.code == 'Escape') {
      lightboxClose(evt);
    } else if (evt.code == 'ArrowRight') {
      nextImage(galleryImages);
    } else if (evt.code == 'ArrowLeft') {
      previousImage(galleryImages);
    }
  }

  lightbox.addEventListener('click', lightboxClose);

  function lightboxClose(evt) {
    if (
      evt.code === 'Escape' ||
      evt.target.classList.value === 'lightbox__overlay' ||
      evt.target.dataset.action === 'close-lightbox'
    ) {
      lightbox.classList.remove('is-open');
      lightboxImg.src = ' ';
      lightboxImg.alt = ' ';
      body.style.overflow = '';

      window.removeEventListener('keydown', onWindowKeydown);
    }
  }

  /* Отдельные слушатели на overlay  и button
  const overlay = document.querySelector('.lightbox__overlay');
  overlay.addEventListener('click', lightboxClose);

  const lightboxCloseBtn = document.querySelector('button[data-action=close-lightbox]');
  lightboxCloseBtn.addEventListener('click', lightboxClose);

  function lightboxClose() {
    lightbox.classList.remove('is-open');
    lightboxImg.src = ' ';
    lightboxImg.alt = ' ';
    body.style.overflow = '';

    window.removeEventListener('keydown', onWindowKeydown);
    overlay.removeEventListener('click', lightboxClose);
    lightboxCloseBtn.removeEventListener('click', lightboxClose);
  }*/

  function nextImage(arr) {
    let index = arr.findIndex(el => {
      return el.original === lightboxImg.src;
    });
    if (index === arr.length - 1) {
      index = 0;
    } else {
      index += 1;
    }
    const nextPicSrc = arr[index].original;
    const nextPicAlt = arr[index].description;
    lightboxImg.src = nextPicSrc;
    lightboxImg.alt = nextPicAlt;
  }

  function previousImage(arr) {
    let index = arr.findIndex(el => {
      return el.original === lightboxImg.src;
    });
    if (index === 0) {
      index = arr.length;
    }
    index -= 1;
    const previousPicSrc = arr[index].original;
    const previousPicAlt = arr[index].description;
    lightboxImg.src = previousPicSrc;
    lightboxImg.alt = previousPicAlt;
  }
}
