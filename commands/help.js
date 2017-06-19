const fs = require("fs");
const config = require("../config.json");

exports.run = (client, message, args) => {
    var commands = "";
    fs.readdir("./commands", (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            let commandName = file.split(".")[0];
            commands += config.prefix + commandName + "\n";
        });
        const picture_links = require("../pictures/picture_links.json");
        let pictures = "";
        for(pictureName in picture_links){
            pictures += config.prefix + pictureName + "\n";
        };

        let summary = "Hi I'm Rebecca. I'm a morning person\n";
        summary += "COMMANDS:\n" + commands;
        summary += "PICTURES:\n" + pictures;

        message.channel.send(summary).catch(console.error);
    });

    
}