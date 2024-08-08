const ALERT_SHOW_TIME = 5000;

let currentMessageBlock = '';

function getRandomNumberInRange (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;

}

function UniqueNumberGenerator (min, max) {
  const usedNumbers = [];

  return function(){
    let generatedNumber = getRandomNumberInRange(min, max);

    while(usedNumbers.includes(generatedNumber)){

      if (usedNumbers.length === max){
        return;
      }
      generatedNumber = getRandomNumberInRange(min, max);

    }
    usedNumbers.push(generatedNumber);

    return generatedNumber;

  };
}

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


const removeMessageBlock = () => {
  document.body.removeChild(currentMessageBlock);
  window.removeEventListener('click', togglePageClick);
  window.removeEventListener('keydown', toggleEscButton);
};

const toggleEscButton = () => {
  removeMessageBlock();
};

const togglePageClick = (evt) => {

  if ((evt.target.matches('.error')) || (evt.target.matches('.success'))){
    removeMessageBlock();
  }
};

const showMessageBlock = (templateContent) => {

  currentMessageBlock = templateContent.querySelector('section').cloneNode(true);

  document.body.appendChild(currentMessageBlock);
  const closeButton = currentMessageBlock.querySelector('button');

  window.addEventListener('click', togglePageClick);
  window.addEventListener('keydown', toggleEscButton);

  closeButton.addEventListener('click', () => {
    removeMessageBlock();
  });

};


export {showAlert, showMessageBlock};
