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
        const picture_links = require("../pictures/picture_links.json");
        let pictures = "";
        for(pictureName in picture_links){
            pictures += config.prefix + pictureName + "\n";
        };

        var sounds = "";
        let summary = "";
        fs.readdir(config["soundFolder"], (err, files) => {
            files.forEach(file => {
                sound = file.split(".")[0];
                sounds += config.prefix + sound + "\n";
            });
            
            summary += "COMMANDS:\n" + commands;
            //summary += "PICTURES:\n" + pictures;
            summary += "SOUNDS:\n" + sounds;
            message.channel.send(summary).catch(console.error);
        });

        
    });

    
}