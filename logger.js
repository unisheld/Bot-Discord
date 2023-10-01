const { createLogger, transports, format } = require('winston');

// Создание и настройка логгера
const logger = createLogger({
  level: 'info', // Уровень логгирования (может быть 'info', 'warn', 'error', и т. д.)
  format: format.combine(
    format.timestamp(), // Добавление времени к каждой записи
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(), // Вывод логов в консоль
    new transports.File({ filename: 'bot.log' }), // Сохранение логов в файл
  ],
});

// Экспорт созданного логгера для использования в других частях приложения
module.exports = logger;
