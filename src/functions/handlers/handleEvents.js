const logger = require('../../../logger');
const ready = require('../../events/client/ready');
const message = require('../../events/client/message');

/**
 * Обрабатывает события для клиента Discord.
 * @param {object} client - Клиент Discord.
 */
module.exports = (client) => {
  // Обработка события ready
  ready(client, logger);

  // Обработка события messageCreate
  message(client, logger);
};
