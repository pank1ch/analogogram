function IsPalindrom (inputString) {

  inputString = inputString.replaceAll(' ', '');
  inputString = inputString.toLowerCase();
  let resultString = '';

  for (let i = inputString.length - 1; i >= 0; i--){
    resultString += inputString[i];
  }


  if (resultString === inputString){
    return true;
  }

  return false;


}

// if (IsPalindrom('Аргентина манит негра')){
//   console.log('слово является палиндромом');
// }
// else{
//   console.log('слово  не является палиндромом');

// }

function GetDigits(inputString){

  inputString = String(inputString).replaceAll(' ', '');

  let resultString = '';


  for (let i = 0; i < inputString.length; i++) {
    const result = Number(inputString[i]);

    if (!isNaN(result)){

      resultString += inputString[i];

    }

  }

  console.log('результат:');

  if (resultString === ''){
    console.log('в строке нет цифр');
  }

  else{
    const resultNumber = Number(resultString);
    console.log(resultNumber);

  }
}

// const testString = 1.5;

// console.log (`Входная строка ${ testString}`);

// GetDigits(testString);


function AddToString(inputString, symbolsCount, symbol){

  if (inputString.length >= symbolsCount){
    console.log(inputString);
  }

  else{
    let resultString = inputString;
    while (resultString.length < symbolsCount){

      if (resultString.length + symbol.length > symbolsCount){

        let isOverNorm = true;
        while (isOverNorm){
          symbol = symbol.slice(0, symbol.length - 1);


          if ((resultString.length + symbol.length) === symbolsCount){
            resultString = symbol + resultString;

            isOverNorm = false;
          }
        }
      } else {
        resultString = symbol + resultString;
      }
    }
    console.log(resultString);

  }

}

// console.log('qwerty', 4, '0');
// AddToString('qwerty', 4, '0');

function CheckLength(inputString = 10, maxLength){

  const stringLength = inputString.length;

  if (stringLength <= maxLength){
    return true;
  }

  return false;

}

