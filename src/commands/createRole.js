const logger = require('../../logger');

/**
 * Создает новую роль на сервере Discord.
 * @param {object} message - Сообщение Discord.
 * @param {array} args - Аргументы команды.
 */
async function createRole(message, args) {
  // Проверяем разрешения пользователя
  const member = message.guild.members.cache.get(message.author.id);
  if (!member || !member.permissions.has('MANAGE_ROLES')) {
    logger.error(`Попытка создания роли ${args[0]} без необходимых разрешений от ${message.author.tag}`);
    return message.reply('У вас недостаточно прав для создания ролей.');
  }

  // Проверяем количество аргументов
  if (args.length !== 2) {
    logger.error(`Неправильное количество аргументов при создании роли от ${message.author.tag}`);
    return message.reply('Используйте команду так: /cr <название роли> <#HEX цвет>');
  }

  // Извлекаем название и цвет роли из аргументов
  const roleName = args[0];
  const roleColor = args[1];

  // Проверяем, существует ли роль с таким названием или цветом
  const existingRole = message.guild.roles.cache.find(
    (role) => role.name === roleName || role.hexColor === roleColor
  );

  // Если роль существует, возвращаем ошибку
  if (existingRole) {
    logger.warn(`Попытка создания существующей роли "${existingRole.name}" от ${message.author.tag}`);
    return message.reply(`Роль "${existingRole.name}" уже существует.`);
  }

  try {
    // Создаем новую роль
    const createdRole = await message.guild.roles.create({
      name: roleName,
      color: roleColor,
    });

    // Записываем действие в лог
    logger.info(`Роль "${createdRole.name}" создана успешно от ${message.author.tag}`);

    // Выдаем созданную роль пользователю, вызвавшему команду
    await member.roles.add(createdRole);

    return message.reply(`Роль "${createdRole.name}" создана успешно.`);
  } catch (error) {
    // Обрабатываем ошибку и записываем ее в лог
    logger.error(`Ошибка при создании роли от ${message.author.tag}: ${error.message}`);
    console.error('Ошибка при создании роли:', error);
    return message.reply('Произошла ошибка при создании роли.');
  }
}

module.exports = createRole;
