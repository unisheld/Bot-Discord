const { ActivityType } = require('discord.js');
const logger = require('../../../logger');

/**
 * Обработчик события "готовность" бота.
 * @param {object} client - Клиент Discord.js.
 */
module.exports = (client) => {
  client.once('ready', () => {
    // Устанавливаем статус бота
    setBotStatus(client);

    // Логируем вход бота
    logBotLogin(client.user.tag);

   
  });
};

/**
 * Устанавливает статус бота.
 * @param {object} client - Клиент Discord.js.
 */
function setBotStatus(client) {
  const statusOptions = {
    name: 'чудлик',
    type: ActivityType.Watching
  };
  client.user.setActivity(statusOptions);
}

/**
 * Логирует вход бота.
 * @param {string} botTag - Тег бота.
 */
function logBotLogin(botTag) {
  logger.info(`Logged in as ${botTag}`);
}
