import type { VercelRequest, VercelResponse } from "@vercel/node";
const { TELEGRAM_TOKEN, VERCEL_URL } = process.env;

import { Telegraf } from "telegraf";

export default async function (req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const bot = new Telegraf(TELEGRAM_TOKEN!);
  bot.launch({
    webhook: {
      domain: VERCEL_URL! as string,
      hookPath: "/api/update",
    },
  });
  res.status(200).send({ VERCEL_URL, TELEGRAM_TOKEN });
}
