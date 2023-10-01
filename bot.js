// Подключение dotenv для загрузки переменных окружения
require('dotenv').config();

// Импорт необходимых модулей из discord.js
const { Client, GatewayIntentBits } = require('discord.js');

// Создание экземпляра клиента Discord
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,             // Для информации о серверах
    GatewayIntentBits.GuildMessages,     // Для сообщений на сервере
    GatewayIntentBits.GuildMembers,      // Для информации о участниках
    GatewayIntentBits.GuildPresences,    // Для информации о присутствии
    GatewayIntentBits.MessageContent,    // Для содержания сообщений
  ],
});

// Получение токена бота из переменных окружения
const token = process.env.BOT_TOKEN;

// Обработчики событий
const handleEvents = require('./src/functions/handlers/handleEvents');
handleEvents(client);

// Обработка команд
const handleCommands = require('./src/functions/handlers/handleCommands');

// Отслеживание события создания сообщения
client.on('messageCreate', handleCommands);

// Вход в Discord с использованием токена бота
client.login(token);
