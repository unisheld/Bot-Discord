const { createCanvas, loadImage } = require('canvas');

/**
 * Создает мем изображения на основе аргументов и отправляет его в чат.
 * @param {object} message - Сообщение Discord.
 * @param {array} args - Аргументы команды.
 */
async function createMeme(message, args) {
  // Преобразуем аргументы в строку, чтобы легче обработать текст в кавычках
  const command = args.join(' ');

  // Ищем текст в кавычках с помощью регулярного выражения
  const regex = /"([^"]+)"/;
  const matches = command.match(regex);

  if (!matches || matches.length < 2) {
    return message.reply('Используйте команду так:  "текст" [размер шрифта] [цвет] [URL изображения или прикрепленное изображение]');
  }

  // Извлекаем текст из найденных совпадений
  const text = matches[1];

  // Удаляем из строки найденный текст в кавычках, чтобы остались остальные аргументы
  const commandWithoutText = command.replace(regex, '');

  // Разбиваем остальные аргументы по пробелам
  const remainingArgs = commandWithoutText.trim().split(' ');

  // Остальные аргументы (цвет и размер шрифта по умолчанию)
  let imageUrl = '';
  let fontSize = 50;
  let fontColor = '#ffffff';

  // Проверяем, если есть дополнительные аргументы
  for (const arg of remainingArgs) {
    if (arg.startsWith('http')) {
      // Если аргумент начинается с "http", считаем его URL изображения
      imageUrl = arg;
    } else if (arg.startsWith('#')) {
      // Если аргумент начинается с "#", считаем его цветом шрифта
      fontColor = arg;
    } else if (parseInt(arg)) {
      // Если аргумент - это число, считаем его размером шрифта
      fontSize = parseInt(arg);
    }
  }

  try {
    let image;
    if (imageUrl.startsWith('http')) {
      // Если URL, загружаем изображение по URL
      image = await loadImage(imageUrl);
    } else if (message.attachments.size > 0) {
      // Если есть вложение, используем вложенное изображение
      const attachment = message.attachments.first();
      image = await loadImage(attachment.url);
    }

    if (!image) {
      return message.reply('Извините, но не удалось загрузить изображение.');
    }

    // Создаем холст с размерами оригинального изображения
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');

    // Рисуем оригинальное изображение
    ctx.drawImage(image, 0, 0, image.width, image.height);

    // Вычисляем максимальный размер шрифта, чтобы текст не выходил за границы
    let maxFontSize = Math.min(fontSize, image.height);

    // Добавляем текст
    ctx.fillStyle = fontColor;
    ctx.textAlign = 'center';

    // Пока размер шрифта больше 0 и текст выходит за границы картинки, уменьшаем размер шрифта
    while (maxFontSize > 0) {
      ctx.font = `${maxFontSize}px Arial`;
      const textWidth = ctx.measureText(text).width;
      if (textWidth < image.width) {
        break;
      }
      maxFontSize--;
    }

    // Рисуем текст с учетом уменьшенного размера шрифта
    ctx.font = `${maxFontSize}px Arial`;
    ctx.fillText(text, canvas.width / 2, canvas.height - 10);

    // Преобразуем изображение в буфер и отправляем как ответ пользователю
    const buffer = canvas.toBuffer();
    const memeAttachment = { attachment: buffer, name: 'meme.png' };
    return message.reply({ files: [memeAttachment] });
  } catch (error) {
    console.error('Ошибка при создании мема:', error);
    return message.reply('Произошла ошибка при создании мема.');
  }
}

module.exports = createMeme;
