import type { VercelRequest, VercelResponse } from "@vercel/node";
const TOKEN_HEADER = "x-telegram-bot-api-secret-token";
const { TELEGRAM_TOKEN, SECRET_TOKEN, CHATGPT_TOKEN } = process.env;
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
const apiKey = "";
import { ChatGPTAPI } from "chatgpt";

export default async function (req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (SECRET_TOKEN == req.headers[TOKEN_HEADER]) {
    const bot = new Telegraf(TELEGRAM_TOKEN!, { handlerTimeout: 4.5 });
    //register some handel
    replayMessage(bot);
    //
    console.log(req.body);

    await bot.handleUpdate(req.body);
    res.status(200).send("ok");
  } else {
    res.status(409).send("非法请求");
  }
}
/**
 * @回复消息示例
 * @param bot
 */
function replayMessage(bot: Telegraf) {
  bot.on(message("text"), async (ctx) => {
    if (ctx.message.text == "/start") {
      return;
    }
    if (ctx.message.text == "chatid") {
      await ctx.replyWithHTML(`you chatid is: <em><b>${ctx.chat.id}</b></em>`, {
        reply_to_message_id: ctx.message.message_id,
      });
    } else {
      try {
        const chatApi = new ChatGPTAPI({
          apiKey: CHATGPT_TOKEN!,
        });
        const res = await chatApi.sendMessage(ctx.message.text);
        await ctx.replyWithHTML(`<em><b>${res.text}</b></em>`);
      } catch (error) {
        await ctx.replyWithHTML(`<em><b>chatgpt api error:  ${error}</b></em>`);
      }
    }
  });
}
