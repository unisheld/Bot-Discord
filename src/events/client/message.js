/**
 * Обрабатывает входящие сообщения и вызывает функцию для обработки команд.
 * @param {object} client - Клиент Discord.js.
 * @returns {function} - Функция-обработчик сообщения.
 */
module.exports = (client) => (message) => {
  console.log('Received message:', message.content);

  // Проверяем, что сообщение не от бота и начинается с команды
  if (!isValidMessage(message)) {
    console.warn('Сообщение не подходит для обработки:', message && message.content);
    return;
  }

  // Передаем и client и message в функцию для обработки команд
  handleCommands(client, message);
};

/**
 * Проверяет, подходит ли сообщение для обработки.
 * @param {object} message - Сообщение Discord.
 * @returns {boolean} - `true`, если сообщение подходит, иначе `false`.
 */
function isValidMessage(message) {
  return !(!message || !message.author || message.author.bot || !message.content.startsWith('/'));
}
