const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all('*', async (req, res) => {
  const method = req.method;
  const url = req.originalUrl;
  const date = new Date().toISOString();

  let message = `Метод: ${method}\nURL: ${url}\nДата: ${date}`;

  if (method === 'POST') {
    message += `\nДанные: \`\`\`json
    ${JSON.stringify(req.body)}
    \`\`\`
    `;
  } else if (method === 'GET') {
    message += `\nПараметры: ${JSON.stringify(req.query)}`;
  }
  console.log(message);
  try {
    const uri = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
    console.log(uri)
    await axios.post(uri, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'markdown'
    });
    res.status(200).send('Сообщение отправлено в Telegram');
  } catch (error) {
    console.error('Ошибка при отправке сообщения в Telegram:', error.responce);
    res.status(500).send('Ошибка сервера');
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
//   console.log(TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID)
});
