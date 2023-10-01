require('dotenv').config();
const WebSocket = require('ws');


/**
 * Функция отправки сообщения в чат GoodGame.
 * @param {string} text - Текст сообщения для отправки.
 */
async function sendMessageToGoodGame(text) {
  // Получение параметров пользователя и текста сообщения из переменных окружения.
  const userId = process.env.USER_ID;
  const token = process.env.TOKEN_GG;
  const channelID = process.env.CHANNEL_ID;
  const messageToSend = text.toString();

  // Формирование объекта с данными авторизации.
  const authData = {
    type: 'auth',
    data: {
      user_id: userId,
      token: token,
    },
  };

  // Создание WebSocket-соединения с сервером чата GoodGame.
  const ws = new WebSocket('wss://chat-1.goodgame.ru/chat2/');

  // Обработка события открытия соединения.
  ws.on('open', () => {
    // Отправка запроса на авторизацию на сервер.
    ws.send(JSON.stringify(authData));
  });

  // Обработка события приема сообщений от сервера.
  ws.on('message', (message) => {
    console.log('Получено сообщение из чата GoodGame:', message.toString());

    // Проверка успешной авторизации.
    if (message.includes('success_auth')) {
      // Формирование объекта с данными для отправки сообщения.
      const messageData = {
        type: 'send_message',
        data: {
          channel_id: channelID,
          text: messageToSend,
          color: '', // Цвет сообщения (пустая строка для цвета по умолчанию)
          icon: '', // Иконка пользователя (пустая строка для иконки по умолчанию)
          role: '', // Роль пользователя (пустая строка для роли по умолчанию)
          mobile: 0, // Мобильный флаг (0 или 1)
        },
      };

      // Отправка сообщения на сервер чата GoodGame.
      ws.send(JSON.stringify(messageData));
      console.log('Сообщение отправлено в чат GoodGame:', messageToSend.toString());
    }
  });

  // Обработка события закрытия соединения.
  ws.on('close', () => {
    console.log('WebSocket-соединение закрыто.');
  });

  // Обработка события ошибки.
  ws.on('error', (error) => {
    console.error('Произошла ошибка WebSocket:', error);
  });
}

module.exports = sendMessageToGoodGame;
