discord-bot written with the [discord.js](https://discord.js.org/#/) javascript library.

Initiate app with
```
npm install
```
Before running for the first time, the file ```config/auth.json``` needs to be created. It should contain a token from https://discordapp.com/developers/applications/me according to this format:
```
{
    "token": "XXXXXXXXXXXXXXXXXXX_YOUR_TOKEN_XXXXXXXXXXXXXXXXXXXXXXXX"
}
```

run the bot with ```node bot.js``` or ```nodemon bot.js ``` if you want changes to the code to apply automatically.

add links to picture_links.json to make the bot send different pictures

```-help``` will show the available commands

