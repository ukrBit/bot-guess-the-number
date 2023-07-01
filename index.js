const { gameOptions, againOptions } = require("./options");

const telegramApi = require("node-telegram-bot-api");

const token = "6395442380:AAEI1n_nLEFgz6hFPoTvYTKotOUhDrmnp7E";

const bot = new telegramApi(token, { polling: true });

const startGame = async (chatId) => {
  await bot.sendMessage(chatId, "Угадай цифру от 0 до 9");
  const rundomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = rundomNumber;
  return bot.sendMessage(chatId, "Отгадывай:", gameOptions);
};

const chats = {};

bot.setMyCommands([
  { command: "/start", description: "Приветсвие" },
  { command: "/info", description: "информация о пользователе" },
  { command: "/game", description: "Игра угадай цифру" },
]);

function start() {
  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if (text === "/start") {
      console.log(msg);
      return bot.sendMessage(chatId, `Привет, ${msg.from.first_name}`);
    }
    if (text === "/info") {
      return bot.sendMessage(
        chatId,
        `Ваше имя: ${msg.chat.first_name} \n Ваш юзернейм: ${msg.chat.username}`
      );
    }
    if (text === "/game") {
      return startGame(chatId);
    }
    return bot.sendMessage(chatId, "Я тебя не понимаю, попробуй еще раз");
  });
}
start();

bot.on("callback_query", async (msg) => {
  const data = msg.data;
  const chatId = msg.message.chat.id;
  if (data === "/again") {
    return startGame(chatId);
  }
  if (data == chats[chatId]) {
    return bot.sendMessage(
      chatId,
      `Правильно! Цифра ${chats[chatId]}`,
      againOptions
    );
  } else {
    return bot.sendMessage(
      chatId,
      `Ты проиграл, цифра ${chats[chatId]}`,
      againOptions
    );
  }
});
