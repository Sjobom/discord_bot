discord-bot written with the [discord.js](https://discord.js.org/#/) javascript library.

Initiate app with
```
npm install
```
The first time the app is started it will ask for a discord API token that you need to generate from https://discordapp.com/developers/applications/me. It is also possible to create an own file```config/auth.json```. It should contain a token according to this format:
```
{
    "token": "YOUR_TOKEN"
}
```

run the bot with
```
node bot.js
``` 
or install [forever](https://www.npmjs.com/package/forever) to run the bot in the background with
```
forever start bot.js
``` 
During development the easiest and most convenient way to test the bot is to run it with [nodemon](https://www.npmjs.com/package/nodemon) which will automatically rebuild the project and restart the server
```
nodemon bot.js
```
Add links to ```pictures/picture_links.json``` to make the bot send different pictures
Create a folder for sounds and add the location of it to the ```config/config.json``` to be able to send sounds.

```-help``` will show the available commands, pictures and sounds

