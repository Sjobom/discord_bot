const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");

const config = require("./config.json");


client.on('ready', () => {
  console.log('I am ready!');
});



// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        // super-secret recipe to call events with all their proper arguments *after* the `client` var.
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});


client.on('message', message => {

    if(message.author.bot) return;

    if(message.content.includes(":its_friday:")) {
        message.channel.send("HEY THATS ME! :smile:");
    }

    //check if it is a command to the bot
    if (!message.content.startsWith(config.prefix)) return;

    // This is the best way to define args. Trust me.
    const args = message.content.split(" ");
    const command = args.shift().slice(config.prefix.length);

    // The list of if/else is replaced with those simple 2 lines:
    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args);
        } catch (err) {
            console.error(err);
        }

});

client.login(config.token);