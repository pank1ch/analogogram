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

export {getRandomNumberInRange, UniqueNumberGenerator};
