const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const prompt = require('prompt');

const config = require("./config/config.json");
const util = require("./util.js");
var auth, token;


client.on('ready', () => {
  console.log('I am ready!');
});


/* VERIFY BOT https://discordapp.com/oauth2/authorize?client_id=325408203166711810&scope=bot

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
/*
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        // super-secret recipe to call events with all their proper arguments *after* the `client` var.
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});
*/


client.on('message', message => {

    // IS THIS A COMMAND/PICTURE REQUEST OR SHOULD WE JUST REACT
    if (!message.content.startsWith(config.prefix)){
        react(message);
    }
    else {
        console.log(message.author.username + " in " + message.channel.name + ": " + message.content);
        const args = message.content.split(" ");
        const command = args.shift().slice(config.prefix.length);

        // CHECK IF MESSAGES IS A COMMAND
        try {
            let commandFile = require(`./commands/${command}.js`);
            commandFile.run(client, message, args);
        } catch (err) {
            //console.error(err);
        }
        
        // CHECK AMONG PICTURE LINKS
        try{
            const picture_links = require("./pictures/picture_links.json");
            for(const pictureName in picture_links){
                if(command === pictureName){
                    message.channel.send(util.embedPicture(picture_links[pictureName]));
                }
            }

        } catch(err){
            console.error(err);
        }

        react(message);
    }
    

    

});

function react (message) {
    if(message.content.includes(":its_friday:")) {
        message.channel.send("HEY THATS ME! :smile:");
    }
    if(message.content.includes("niggah")){
        //message.reply("I'm the only niggah around here");
        message.delete();
    }
    /*
    if(message.author.username === "Ingmar"){
        message.reply("Har du installerat Overwatch viktor?");
    }
    */
    
    return;
;}

function loginCheck(callback){

    if(!fs.existsSync('config/auth.json')){
        prompt.start();
        prompt.get(['token'], function(err, result){
            if(err){sonsole.log(err); return;}
            var dict = {"token": result.token};
            var dictString = JSON.stringify(dict);
            fs.writeFile('./config/auth.json', dictString);
        });
    } else {
        console.log("I WAS HERE");
    }

    auth = require("./config/auth.json");
    token = auth.token;
    callback();
}


loginCheck(function(){
    client.login(token);
});

