var unirest = require('unirest');
const config = require("../config/config.json");
const auth = require("../config/auth.json");

exports.run = (client, message, args) => {
    var names = message.content.split(" ")
    names.shift() // shift to remove '-love' command

    // No names given in command
    if(names.length < 1) {
        return;
    }

    // First name in command
    first_name = names[0]

    // Is there a second name
    if(names.length == 2) {
        second_name = names[1]
    } else { // A single name will be compared with the bots name
        second_name = config.bot_name;
    }
    
    // Request to MashApes Love Calculator
    // Get your API key here https://market.mashape.com/ajith/love-calculator
    unirest.get("https://love-calculator.p.mashape.com/getPercentage?fname=" + first_name + "&sname=" + second_name)
    .header("X-Mashape-Key", auth.mash_ape)
    .header("Accept", "application/json")
    .end(function (result) {
        json = result.body
        reply = capitalize(json["fname"]) + " and " + capitalize(json["sname"]) + " has a " + json["percentage"] + "% chance of love!\n" + json["result"];
        message.channel.send(reply);
    });
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}