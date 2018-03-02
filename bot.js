const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const prompt = require('prompt-promise');
const config = require("./config/config.json");
const util = require("./util.js");
const picture_links = require("./pictures/picture_links.json");

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
                } catch(err){
                    console.error(err);
            }
            
            // CHECK AMONG PICTURE LINKS
                for(var pictureName in picture_links){
                    if(command === pictureName){
                        message.channel.send(util.embedPicture(picture_links[pictureName]));
                    }
                }

            // CHECK AMONG SOUND LINKS
                fs.readdir(config["soundFolder"], (err, files) => {
                    if(files !== undefined){
                        files.forEach(file => {
                            sound = file.split(".")[0];
                            if(command === sound){
                                var soundPath = config.soundFolder + file;
                                util.playSound(client, message, soundPath);
                            }
                        });
                    }
                    
                });

            

        }
    }catch(err){

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

