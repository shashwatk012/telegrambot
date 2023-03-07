const { Telegraf } = require("telegraf");
const { v4: uuidV4 } = require("uuid");
require("dotenv").config();
let factGenerator = require("./factGenerator");
const axios = require("axios");

const bot = new Telegraf(process.env.BOT_TOKEN, { polling: true });

const items = [
  "Iphone6",
  "Iphone7",
  "Iphone8",
  "Iphone9",
  "Iphone11",
  "Iphone12",
  "Iphone13",
  "Iphone14",
];

bot.start((ctx) => {
  let message = ` Please write subscribe to get the current iphone prices`;
  ctx.reply(message);
});

bot.hears("subscribe", (ctx) => {
  let animalMessage = `Great, here are the list of iphones. Which Iphone you want to choose?`;
  ctx.deleteMessage();
  // setInterval(() => {
  bot.telegram.sendMessage(ctx.chat.id, animalMessage, {
    reply_markup: {
      inline_keyboard: [...items.map((p) => [{ text: p, callback_data: p }])],
    },
  });
  // }, 86400000);
});

//method that returns image of a iphone
items.map((e) => {
  bot.action(e, async (ctx) => {
    let imagePath = `./temp/${uuidV4()}.jpg`;
    ctx.reply("Please wait! we are coming back soon.");
    await factGenerator.generateImage(imagePath, e);
    await ctx.replyWithPhoto({ source: imagePath });
  });
});

bot.launch();
