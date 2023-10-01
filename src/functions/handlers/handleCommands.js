const createRole = require('../../commands/createRole');
const createMeme = require('../../commands/mem');
const createMemeGG = require('../../commands/goodgame/createMemeGG');
const logger = require('../../../logger');

// Определите объект команд с функциями для каждой команды
const commands = {
  '/cr': (message, args) => createRole(message, args),
  '/mem': (message, args) => createMeme(message, args),
  '/memgg': (message, args) => createMemeGG(message, args),
};

/**
 * Обрабатывает команды в сообщении.
 * @param {object} message - Сообщение Discord.
 */
function handleCommands(message) {
  const args = message.content.split(' ');
  const command = args[0];

  // Проверьте, существует ли команда в списке команд
  if (commands.hasOwnProperty(command)) {
    // Вызовите соответствующую функцию команды
    commands[command](message, args.slice(1))
      .then(() => {
        // Команда выполнена успешно
        logger.info(`Команда ${command} выполнена успешно в канале ${message.channel.name} на сервере ${message.guild.name}`);
      })
      .catch((error) => {
        // Обработка ошибок при выполнении команды
        logger.error(`Ошибка при выполнении команды ${command}: ${error.message}`);
      });
  } else {
    // Команда не найдена
   
  }
}

module.exports = handleCommands;
