import {createTemporaryImages} from './data.js';

const images = createTemporaryImages();
const imagesContainer = document.querySelector('.pictures');

const templateContent = document.querySelector('#picture').content;
const imageTemplate = templateContent.querySelector('.picture');

const imagesFragment = document.createDocumentFragment();

function ThumbnailsRendering(){

  images.forEach(({id, url, description, likes, comments}) => {

    const thumbnailCopy = imageTemplate.cloneNode(true);

    const thumbnailImage = thumbnailCopy.children[0];
    thumbnailImage.src = url;
    thumbnailImage.alt = description;

    thumbnailImage.setAttribute('data-id', id);

    const thumbnailLikes = thumbnailCopy.querySelector('.picture__likes');
    thumbnailLikes.textContent = likes;

    const thumbnailComments = thumbnailCopy.querySelector('.picture__comments');
    thumbnailComments.textContent = comments.length;

    imagesFragment.appendChild(thumbnailCopy);
  });

  imagesContainer.appendChild(imagesFragment);

}

export {ThumbnailsRendering, imagesContainer, images};

