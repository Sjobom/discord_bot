const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const prompt = require('prompt-promise');
const config = require("./config/config.json");
const util = require("./util.js");
const conversation = require("./features/conversation.js");

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

    try{
        const args = message.content.split(" ");
        // Is the user @mentioning the bot?
        if(args[0] == "<@" + client.user.id + ">") {
            conversation.ask(message).then(function(reply){
                message.channel.send(message.member + ' ' + reply);
            }).catch(function (error){
                message.channel.send(message.member + " something went wrong with cleverbot, perhaps the API key is missing?\nerror: " + error);
            });
        } 
        // IS THIS A COMMAND OR SHOULD WE JUST REACT
        else if (!message.content.startsWith(config.prefix)){
            react(message);
        }
        else {
            console.log(message.author.username + " in " + message.channel.name + ": " + message.content);
            const command = args.shift().slice(config.prefix.length);
            // CHECK IF MESSAGE IS A COMMAND
            let commandFile = require(`./commands/${command}.js`);
            commandFile.run(client, message, args);
        
        }
    }catch(err){
        console.log('error:', err.stack);
    }
    
});

function react (message) {
    if(message.content.includes(":its_friday:")) {
        message.channel.send("HEY THATS ME! :smile:");
    }
    return;
;}

// Function to check if an auth.json file exists with a discord API token
function loginCheck(callback){
    try{
        if(!fs.existsSync('config/auth.json')){
            var_dict = {};
            prompt("Insert your discord app token \n(can be created at https://discordapp.com/developers/applications/me)\ntoken: ")
            .then((token)=> {
                var_dict["token"] = token;
                console.log();
                return prompt("Insert MashApe API key \n(can be created at https://market.mashape.com/ajith/love-calculator)\napi key:");
            })
            .then((api_key)=> {
                var_dict["mashape_api_key"] = api_key;
                var dictString = JSON.stringify(var_dict);
                fs.writeFile('./config/auth.json', dictString, ()=>{
                    auth = require("./config/auth.json");
                    callback();
                });
            })
            .catch(function rejected(err) {
                console.log('error:', err.stack);
                prompt.finish();
            });
        } else {
            auth = require("./config/auth.json");
            callback();
        }
    } catch(err){
        console.log(err);
    }
}


loginCheck(function(){
    client.login(auth.token);
});

