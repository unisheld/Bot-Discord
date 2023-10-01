const sendMessageToGoodGame = require('./sendMessageGoodgame');
const mem = require('../mem');

/**
 * Создает мем и отправляет его в чат GoodGame.
 * @param {object} message - Сообщение Discord.
 * @param {array} args - Аргументы команды.
 */
async function createMemeGG(message, args) {
  try {
    const result = await mem(message, args);

    // Сохраняем URL отправленной картинки в переменной
    const lastSentImageUrl = result.attachments.first().url;

    // Ищем позицию .png
    const dotPngIndex = lastSentImageUrl.indexOf(".png");

    // Если .png найден, обрезаем URL до этой позиции
    if (dotPngIndex !== -1) {
      const trimmedImageUrl = lastSentImageUrl.slice(0, dotPngIndex + 4); // +4 для включения .png  
      // Отправляем текст в чат GoodGame
      await sendMessageToGoodGame(trimmedImageUrl);
    } else {
      console.log("URL не содержит .png");
    } 
  } catch (error) {
    console.error('Ошибка при создании мема:', error);
    return message.reply('Произошла ошибка при создании мема.');
  }
}

module.exports = createMemeGG;
