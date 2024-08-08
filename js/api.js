const BASE_URL = 'https://28.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

const Method = {
  GET: 'GET',
  POST: 'POST'
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить изображения. Попробуйте перезагрузить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};


const getData = () => fetch(
  `${BASE_URL}${Route.GET_DATA}`)
  .then((response) => {
    if (!response.ok){
      throw new Error();
    }
    return response.json();
  })
  .catch(() => {
    throw new Error(ErrorText.GET_DATA);
  });


const sendData = (body) => fetch(
  `${BASE_URL}${Route.SEND_DATA}`,
  {
    method: Method.POST,
    body,
  })
  .then((response) => {
    if (!response.ok){
      throw new Error();
    }
  })
  .catch(() => {
    throw new Error(ErrorText.SEND_DATA);
  });

export {getData, sendData};
