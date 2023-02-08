import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Message, Update } from "telegraf/types";
import { Telegram } from "telegraf";
const { TELEGRAM_TOKEN, VERCEL_URL } = process.env;

export default async function (req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { message }: { message: Message } = req.body;
  console.log("message:", message);
  const TELEGRAM_TOKEN = "6101132909:AAG7QrJ2aZBUMFWjG5x8zDJVBb2MyPGbXe8";
  const bot = new Telegram(TELEGRAM_TOKEN);
  await bot.sendMessage(message.chat.id, `${Date.now()}`, {
    reply_to_message_id: message.message_id,
  });
  res.send(200);
}
