const fs = require("fs");
const config = require("../config/config.json");

exports.run = (client, message, args) => {
    var commands = "";
    fs.readdir("./commands", (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            let commandName = file.split(".")[0];
            commands += config.prefix + commandName + "\n";
        });
        message.channel.send("Here are the things that I can do:\n" + commands).catch(console.error);

    });

    
}