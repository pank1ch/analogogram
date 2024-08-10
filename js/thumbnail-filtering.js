import { ThumbnailsRendering } from './thumbnail-rendering.js';
import {GetUniqueNumberGenerator, debounce} from './util.js';

const imagesContainer = document.querySelector('.pictures');
const imageFilters = document.querySelector('.img-filters');
let imagesData = {};

const filteringButtons = imageFilters.querySelectorAll('button');

const defaultButton = imageFilters.querySelector('#filter-default');
const randomButton = imageFilters.querySelector('#filter-random');
const popularButton = imageFilters.querySelector('#filter-discussed');


const enableFilters = (data) => {

  imagesData = data;
  imageFilters.classList.remove('img-filters--inactive');
};


const removeImages = () => {

  const currentImages = imagesContainer.querySelectorAll('.picture');
  currentImages.forEach((image) => image.remove());
};


const getImageComments = (image) => {
  const commentsCount = image.comments.length;
  return commentsCount;
};


const compareImages = (ImageA, ImageB) => {
  const commentsA = getImageComments(ImageA);
  const commentsB = getImageComments(ImageB);

  return commentsB - commentsA;
};

const showDefaultImages = () => {

  removeImages();
  ThumbnailsRendering(imagesData);
};

const showPopularImages = () => {

  const sortedData = imagesData.slice().sort(compareImages);

  removeImages();
  ThumbnailsRendering(sortedData);

};


const showRandomImages = () => {

  const randomIdArray = [];
  const uniqueNumberGenerator = GetUniqueNumberGenerator(0,24);
  for (let i = 0; i < 10; i++){

    const newId = uniqueNumberGenerator();
    randomIdArray.push(newId);
  }

  const randomData = [];

  for (let i = 0; i < randomIdArray.length; i++){

    const imageObject = imagesData.find((image) => image.id === randomIdArray[i]);

    randomData.push(imageObject);
  }

  removeImages();
  ThumbnailsRendering(randomData);

};


const setActiveButton = (evt) => {

  filteringButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });

  const activeButton = evt.target;
  activeButton.classList.add('img-filters__button--active');

};


defaultButton.addEventListener('click', debounce((evt) => {
  setActiveButton(evt);
  showDefaultImages();
}));

popularButton.addEventListener('click', debounce((evt) => {
  setActiveButton(evt);
  showPopularImages();
}));

randomButton.addEventListener('click', debounce((evt) => {
  setActiveButton(evt);
  showRandomImages();
}));


export {enableFilters};
