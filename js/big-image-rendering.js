import {imagesContainer, images} from './thumbnail-rendering.js';

const pageBody = document.body;
const bigPicture = document.querySelector('.big-picture');

const pictureCloseButton = bigPicture.querySelector('.big-picture__cancel');

pictureCloseButton.addEventListener('click', () =>{

  bigPicture.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  OnimageClose();

});


imagesContainer.addEventListener('click', (evt) =>{


  if (evt.target.matches('.picture__img')){

    const imageObject = images.find((image) => image.id === Number(evt.target.dataset.id));

    bigPicture.classList.remove('hidden');
    pageBody.classList.add('modal-open');

    const pictureImg = bigPicture.querySelector('.big-picture__img').children[0];
    pictureImg.src = imageObject.url;

    const likesCount = bigPicture.querySelector('.likes-count');
    likesCount.textContent = imageObject.likes;

    const commentsCount = bigPicture.querySelector('.comments-count');
    commentsCount.textContent = imageObject.comments.length;

    const commentsContainer = bigPicture.querySelector('.social__comments');
    commentsContainer.innerHTML = '';
    addComments(commentsContainer, imageObject.comments);

    const pictureDescription = bigPicture.querySelector('.social__caption');
    pictureDescription.textContent = imageObject.description;


    const commentCountContainer = bigPicture.querySelector('.social__comment-count');
    commentCountContainer.classList.add('hidden');

    const commentLoadButton = bigPicture.querySelector('.comments-loader');
    commentLoadButton.classList.add('hidden');

    window.addEventListener('keydown', toggleEscButton);

    // console.log(evt.target.dataset.id);
    // const foundImage = images.find((image) => image.id === Number(evt.target.dataset.id));
    // // const foundImage = images.find((image) => image.id === evt.target.dataset.id);
    // console.log(foundImage);
  }


});


function addComments(commentsContainer, commentsList){

  const commentsFragment = document.createDocumentFragment();

  commentsList.forEach((commentObject) => {
    const newComment = document.createElement('li');
    newComment.classList.add('social__comment');

    const commentImage = document.createElement('img');
    commentImage.classList.add('social__picture');
    commentImage.src = commentObject.avatar;
    commentImage.alt = commentObject.name;
    commentImage.width = 35;
    commentImage.height = 35;
    newComment.appendChild(commentImage);

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = commentObject.message;
    newComment.appendChild(commentText);

    commentsFragment.appendChild(newComment);
  });


  commentsContainer.appendChild(commentsFragment);
}

function OnimageClose(){

  window.removeEventListener('keydown', toggleEscButton);

}

function toggleEscButton(evt){

  if (evt.key === 'Escape'){

    bigPicture.classList.add('hidden');
    pageBody.classList.remove('modal-open');
    OnimageClose();


  }

}
