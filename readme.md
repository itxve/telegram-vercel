## Telegram + Vercel Demo(仅自玩)

使用 Vercel 部署 Telegram 简单示例

### 增加 chatgpt(不支持上下文)

## Vercel 部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fitxve%2Ftelegram-vercel&env=TELEGRAM_TOKEN,SECRET_TOKEN)

# 部署后使用步骤

- 访问`/api/setwebhook`设置回调地址

# 本地开发

- 使用 `cpolar` 内网穿透

- 替换`.env`中的环境变量

- 访问`/api/setwebhook`设置回调地址

### 写在最后

- 缺点：逻辑没法独立出来，只能全写在`update.ts`中，头疼

- express+vercel 可能会解决这个问题

## License

[The MIT License (MIT)](https://github.com/itxve/telegram-vercel/blob/master/LICENSE)
