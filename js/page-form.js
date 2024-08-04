
const pageBody = document.body;

const pageForm = document.querySelector('.img-upload__form');
const formOverlay = document.querySelector('.img-upload__overlay');
const formOverlayPicture = formOverlay.querySelector('.img-upload__preview').children[0];

const formCloseButton = formOverlay.querySelector('.img-upload__cancel');

const fileInput = document.querySelector('.img-upload__input');


const hashtagInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');



fileInput.addEventListener('change', (evt) =>{

  const userImage = evt.target.files[0];
  const userImageURL = URL.createObjectURL(userImage);

  formOverlayPicture.src = userImageURL;

  formOverlay.classList.remove('hidden');
  pageBody.classList.add('modal-open');

  window.addEventListener('keydown', toggleEscButton);
});

formCloseButton.addEventListener('click', () => {

  OnFormClose();
});


function OnFormClose(){

  fileInput.value = '';
  hashtagInput.value = '';
  descriptionInput.value = '';
  formOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  window.removeEventListener('keydown', toggleEscButton);

}


function toggleEscButton(evt){


  if (evt.key === 'Escape'){

    if ((document.activeElement !== hashtagInput) && (document.activeElement !== descriptionInput)){

      OnFormClose();
    }

  }

}

const pristine = new Pristine(
  pageForm,
  {
    classTo: 'img-upload__text',
    errorTextParent: 'img-upload__text',
    errorTextTag: 'div',
    errorTextClass: 'text__description--invalid'
  }
);

pageForm.addEventListener('submit', (evt) => {

  if (pristine.validate() === false){
    evt.preventDefault();
  }


});


function validateHashtag(value){

  if (value === ''){
    return true;
  }

  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;
  const inputString = value.split('');
  let hashtagsArray = [];

  for (let i = 1; i < inputString.length; i++){

    if ((inputString[i] === '#') && (inputString[i - 1] === '#')){

      return false;
    }
  }

  hashtagsArray = value.toLowerCase().split(' ').filter((hashtag) => hashtag !== '');


  console.log(hashtagsArray);

  for (let i = 0; i < hashtagsArray.length; i++){
    if (hashtagRegex.test(hashtagsArray[i]) === false){
      return false;
    }
  }

  if (new Set(hashtagsArray).size !== hashtagsArray.length){
    return false;
  }

  if (hashtagsArray.length > 5){
    return false;
  }


  return true;
}

pristine.addValidator(
  hashtagInput,
  validateHashtag,
  'Хештэг невалиден!'
);


function validateDescription(value){

  return value.length <= 140;
}

pristine.addValidator(
  descriptionInput,
  validateDescription,
  'Длина комментария не может составлять больше 140 символов'
);
