
const imagesContainer = document.querySelector('.pictures');

const pageBody = document.body;
const bigPicture = document.querySelector('.big-picture');

const pictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const commentsContainer = bigPicture.querySelector('.social__comments');

const currentCommentsCountField = bigPicture.querySelector('.current-comments-count');
const allCommentsCountField = bigPicture.querySelector('.all-comments-count');

const commentLoadButton = bigPicture.querySelector('.comments-loader');

let imageComments = [];


function setUserThumbnailsClick(imagesData){

  imagesContainer.addEventListener('click', (evt) =>{

    if (evt.target.matches('.picture__img')){

      const imageObject = imagesData.find((image) => image.id === Number(evt.target.dataset.id));



      const pictureImg = bigPicture.querySelector('.big-picture__img').children[0];
      pictureImg.src = imageObject.url;

      const likesCount = bigPicture.querySelector('.likes-count');
      likesCount.textContent = imageObject.likes;

      const pictureDescription = bigPicture.querySelector('.social__caption');
      pictureDescription.textContent = imageObject.description;

      commentLoadButton.classList.remove('hidden');

      allCommentsCountField.textContent = imageObject.comments.length;

      commentsContainer.innerHTML = '';

      currentCommentsCountField.textContent = '';

      imageComments = imageObject.comments.slice();


      commentsLoad(imageComments);

      window.addEventListener('keydown', toggleEscButton);

      bigPicture.classList.remove('hidden');
      pageBody.classList.add('modal-open');

    }

  });
}

function commentsLoad(){

  let currentComments = [];

  if (imageComments.length <= 5){

    addComments(imageComments);
    currentCommentsCountField.textContent = Number(currentCommentsCountField.textContent) + imageComments.length;
    commentLoadButton.classList.add('hidden');
  }

  else{

    currentComments = imageComments.slice(0,5);
    currentCommentsCountField.textContent = Number(currentCommentsCountField.textContent) + currentComments.length;
    imageComments = imageComments.slice(5);
    addComments(currentComments);

  }

}

commentLoadButton.addEventListener('click', () =>{

  commentsLoad(imageComments);

});


function addComments(commentsList){

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


pictureCloseButton.addEventListener('click', () =>{

  bigPicture.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  OnimageClose();

});

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

export {setUserThumbnailsClick};
