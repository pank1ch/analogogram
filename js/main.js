const IMAGES_COUNT = 25;

const DESCRIPTIONS = [
  'Наслаждаюсь моментом 🌟',
  'Лучшие воспоминания с любимыми людьми 💖',
  'Маленькие радости каждый день 😊',
  'Просто хороший день 🌼',
  'Запечатлел этот момент 📸',
  'Незабываемые моменты 🌠',
  'Прекрасное время в отличной компании 🌺',
  'Счастлив здесь и сейчас 🌈',
  'Жизнь в кадре 📷',
  'Новые впечатления и эмоции 🌍'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Леха',
  'Маша',
  'Димон',
  'Анна',
  'Сергей',
  'Елена',
  'Иван',
  'Ольга',
  'Коляны4',
  'Наталья',
  'Джон',
  'Эмма',
  'Лиам',
  'Софи',
  'Оливер',
  'Изабелла',
  'Ной',
  'Миа',
  'Лука',
  'Ариана'
];


function getRandomNumberInRange (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;

}

function UniqueNumberGenerator (min, max) {
  const usedNumbers = [];

  return function(){
    let generatedNumber = getRandomNumberInRange(min, max);

    while(usedNumbers.includes(generatedNumber)){

      if (usedNumbers.length === max){
        console.error('ВСЕ ПОЛОМАЛОСЬ БЛЯ');
        return;
      }
      generatedNumber = getRandomNumberInRange(min, max);

    }
    usedNumbers.push(generatedNumber);

    return generatedNumber;

  };
}

const getUniqueImageId = UniqueNumberGenerator(1,25);
const getUniqueUrlId = UniqueNumberGenerator(1,25);
const getUniqueCommentId = UniqueNumberGenerator(1,1000000);


const createComment = () =>({
  id: getUniqueCommentId(),
  avatar: `img/avatar-${ getRandomNumberInRange(1,6) }.svg`,
  message: COMMENTS[getRandomNumberInRange(0, COMMENTS.length - 1)],
  name: NAMES[getRandomNumberInRange(0, NAMES.length - 1)]

});


const createImage = () =>({
  id: getUniqueImageId(),
  url: `photos/${ getUniqueUrlId() }.jpg`,
  description: DESCRIPTIONS[getRandomNumberInRange(0, DESCRIPTIONS.length - 1)],
  likes: getRandomNumberInRange(15,200),
  comments: Array.from({length: getRandomNumberInRange(2,6)}, createComment)

});

const temporaryImages = Array.from({length: IMAGES_COUNT}, createImage);

console.log(temporaryImages);



// getUniqueNumber = (min, max) =>{
//   let usedNumbers = [];

//   let generatedNumber = getRandomNumberInRange(min, max);

//   while(usedNumbers.includes(generatedNumber)){

//     generatedNumber = getRandomNumberInRange(min, max);

//   }
//   usedNumbers.push(generatedNumber);

// }


