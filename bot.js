import { Telegraf } from "telegraf";

const BOT_TOKEN = process.env.BOT_TOKEN; // токен, который дал @BotFather
const bot = new Telegraf(BOT_TOKEN);

// команда /start
bot.start((ctx) => {
  ctx.reply("Привет 👋 Нажми на кнопку меню снизу, чтобы сыграть в змейку!");
});

// обработка данных из WebApp
bot.on("message", (ctx) => {
  const data = ctx.message?.web_app_data?.data;
  if (!data) return; // если это обычное сообщение, пропускаем

  try {
    const payload = JSON.parse(data);
    if (payload.score !== undefined) {
      ctx.reply(`🐍 Ты набрал ${payload.score} очков!`);
    }
  } catch (e) {
    console.error("Ошибка при обработке данных:", e);
  }
});

// запуск
bot.launch();
console.log("Бот запущен!");
