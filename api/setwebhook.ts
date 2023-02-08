import type { VercelRequest, VercelResponse } from "@vercel/node";
// 系统变量没法覆盖 https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables

const { VERCEL_URL, DEV_VERCEL_URL, TELEGRAM_TOKEN, SECRET_TOKEN, NODE_ENV } =
  process.env;
import { Telegraf } from "telegraf";

export default async function (req: VercelRequest, res: VercelResponse) {
  const bot = new Telegraf(TELEGRAM_TOKEN!);
  let domain =
    NODE_ENV == "development"
      ? DEV_VERCEL_URL!
      : `https://${VERCEL_URL! as string}`;
  console.log("domain:::::", domain);

  await bot.createWebhook({
    domain,
    path: "/api/update",
    secret_token: SECRET_TOKEN,
  });

  res.status(200).send({
    webhook: `${domain}/api/update`,
  });
}
