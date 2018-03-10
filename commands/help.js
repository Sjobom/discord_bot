const fs = require("fs");
const config = require("../config/config.json");
const bot_description = require('../internal_data/bot_description.json');
const command_description = require('../internal_data/command_description.json');

exports.run = (client, message, args) => {
    var help_string = "";
    help_string += bot_description['description'] + '\n';

    for(var key in command_description) {
        help_string += config.prefix + key + '\t' + command_description[key] + '\n';
    }

    message.channel.send(help_string);
}