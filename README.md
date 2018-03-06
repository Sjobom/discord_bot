A simple (but hopefully fun) discord bot written with the [discord.js](https://discord.js.org/#/) library.

### Installation
Initiate app with
```
npm install
```
The first time the app is started it will ask for a discord API token that you need to generate from [here](https://discordapp.com/developers/applications/me). And also a Mashape API key (for the love command e.g.) which can be aquired by creating an account [here](https://market.mashape.com/ajith/love-calculator). It is also possible to create an own file```config/auth.json```. It should look like this:
```
{"token": "YOUR_TOKEN", "mashape_api_key": "YOUR_MASHAPE_API_KEY"}
```

run the bot with
```
node bot.js
``` 
or install [forever](https://www.npmjs.com/package/forever) to run the bot in the background with
```
forever start bot.js
``` 
### Add the bot to a discord server
* go to [discords developer pages](https://discordapp.com/developers/applications/me):
* create an app (if you haven't already)
* generate an OAuth 2 URL
* visit the OAuth 2 URL and select which server you want to add the bot to!

### Some commands
* ```-help``` will show all the available commands
* ```-love <name1> <name2 (optional)>``` will calculate the chance of love between name1 and name2
* ```-random <tags>``` searches for a random gif based on the tags

### Development
During development the easiest and most convenient way to test the bot is to run it with [nodemon](https://www.npmjs.com/package/nodemon) which will automatically rebuild the project and restart the server
```
nodemon bot.js
```

### Contributing
Feel free to fork this repo and create pull requests if you want to!


