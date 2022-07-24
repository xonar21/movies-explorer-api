const cors = (req, res, next) => {
  const { origin } = req.headers; // Сохранил запрос в переменную origin
  console.log('origin = ', origin);
  const { method } = req; // Сохранил запрос (метод HTTP) в переменную method
  const requestHeaders = req.headers['access-control-request-headers']; // сохранил список заголовков запроса
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', true);

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS); // (по умолчанию) разрешаем кросс-доменные запросы любых типов
    res.header('Access-Control-Allow-Headers', requestHeaders); // разрешаем кросс-доменные запросы с данными заголовками

    return res.end(); // завершил обработку запроса, возвращаю результат пользователю
  }

  return next();
};

module.exports = cors;