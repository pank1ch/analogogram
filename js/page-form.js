
const pageBody = document.body;

const pageForm = document.querySelector('.img-upload__form');
const formOverlay = document.querySelector('.img-upload__overlay');
const formOverlayPicture = formOverlay.querySelector('.img-upload__preview').children[0];

const formCloseButton = formOverlay.querySelector('.img-upload__cancel');

const fileInput = document.querySelector('.img-upload__input');


const hashtagInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

const scaleSmallerControl = document.querySelector('.scale__control--smaller');
const scaleBiggerControl = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');

const sliderContainer = document.querySelector('.img-upload__effect-level');
const formSlider = sliderContainer.querySelector('.effect-level__slider');
const sliderInput = sliderContainer.querySelector('.effect-level__value');
const radioButtons = Array.from(document.querySelectorAll('.effects__radio'));
const noEffectButton = document.querySelector('#effect-none');

const EFFECTS = [
  { name: 'none',
    filter: 'none',
    min: 0,
    max: 1,
    step: 0.1,
    units: ''
  },
  { name: 'chrome',
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    units: ''
  },
  { name: 'sepia',
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    units: ''
  },
  { name: 'marvin',
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    units: '%'
  },
  { name: 'phobos',
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    units: 'px'
  },
  { name: 'heat',
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    units: ''
  }
];

const noEffect = EFFECTS[0];

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
  noEffectButton.checked = 'true';
  formOverlayPicture.className = '';
  formOverlayPicture.style.filter = 'none';
  formOverlayPicture.style.transform = 'scale(1)';
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


//---------------------------------SCALE---------------------------------------//


function zoomOut(){

  const inputValue = parseInt(scaleInput.value, 10);

  if (inputValue > 25){
    scaleInput.value = `${inputValue - 25 }%`;
  }
  changeScale();
};

scaleSmallerControl.addEventListener('click', zoomOut);


function zoomIn(){

  const inputValue = parseInt(scaleInput.value, 10);

  if (inputValue < 100){
    scaleInput.value = `${inputValue + 25 }%`;
  }
  changeScale();
};

scaleBiggerControl.addEventListener('click', zoomIn);


function changeScale(){

  const inputValue = parseInt(scaleInput.value, 10);

  formOverlayPicture.style.transform = `scale(${inputValue / 100 })`;
}

//---------------------------------SLIDER--------------------------------------//


sliderContainer.style.display = 'none';
noUiSlider.create(formSlider, {
  range: {
    min: noEffect.min,
    max: noEffect.max
  },
  start: 1,
  step: noEffect.step,
  connect: 'lower'
});

radioButtons.forEach((radio) => {

  radio.addEventListener('change', changeEffect);
});

function changeEffect(evt){

  formOverlayPicture.className = '';
  const selectedEffect = evt.target;

  if (selectedEffect.value === 'none'){
    formOverlayPicture.style.filter = 'none';
    sliderContainer.style.display = 'none';
    formSlider.setAttribute('disabled', true);
  }
  else{
    sliderContainer.style.display = 'block';
    formSlider.removeAttribute('disabled', true);
  }

  const sliderSettings = EFFECTS.find((effect) => effect.name === selectedEffect.value);
  sliderUpdate(sliderSettings);

  const effectClass = `effects__preview--${selectedEffect.value}`;
  formOverlayPicture.classList.add(effectClass);

}

function sliderUpdate(sliderSettings){
  formSlider.noUiSlider.updateOptions({
    range: {
      min: sliderSettings.min,
      max: sliderSettings.max
    },
    start: sliderSettings.max,
    step: sliderSettings.step
  });

  sliderInput.value = sliderSettings.max;

}

formSlider.noUiSlider.on('update', () => {

  const selectedRadioButton = radioButtons.find((radio) => radio.checked === true);
  const selectedEffect = EFFECTS.find((effect) => effect.name === selectedRadioButton.value);

  const sliderValue = formSlider.noUiSlider.get();
  sliderInput.value = sliderValue;

  if (!(selectedEffect.name === 'none')){
    formOverlayPicture.style.filter = `${selectedEffect.filter}(${sliderValue}${selectedEffect.units})`;
  }

});


