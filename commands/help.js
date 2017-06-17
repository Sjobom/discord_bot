const fs = require("fs");
const config = require("../config.json");

exports.run = (client, message, args) => {
    var commands = "LOOK AT ME! I can:\n";
    fs.readdir("./commands", (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            let commandName = file.split(".")[0];
            commands += config.prefix + commandName + "\n";
        });
        message.channel.send(commands).catch(console.error);
    });

    
}