var unirest = require('unirest');
const config = require("../config/config.json");
const auth = require("../config/auth.json");

exports.run = (client, message, args) => {
    try {
        // Check if MashApe API key for Love Calculator exists
        if(auth.mashape_api_key == ""){
            message.channel.send("The bot needs a MashApe API key to use the love feature!\nGet your API key here https://market.mashape.com/ajith/love-calculator")
        }
        var names = message.content.split(" ")
        names.shift() // shift to remove '-love' command

        // No names given in the command
        if(names.length < 1) {
            return;
        }

        // First name in command
        first_name = names[0]

        // Is there a second name
        if(names.length >= 2) {
            second_name = names[1]
        } else { // A single name will be compared with the bots name
            second_name = config.bot_name;
        }
        
        // Request to MashApes Love Calculator
        // Get your API key here https://market.mashape.com/ajith/love-calculator
        unirest.get("https://love-calculator.p.mashape.com/getPercentage?fname=" + first_name + "&sname=" + second_name)
        .header("X-Mashape-Key", auth.mashape_api_key)
        .header("Accept", "application/json")
        .end(function (result) {
            json = result.body
            
            // If the request was not successful
            if(result.status != 200) {
                message.channel.send("HTTP response code " + result.status + ": " + json["message"])
            } 
            // If we got a successful 200 HTTP response
            else {
                reply = capitalize(json["fname"]) + " and " + capitalize(json["sname"]) + " has a " + json["percentage"] + "% chance of love!\n" + json["result"];
                message.channel.send(reply);
            }
            
        });
    } catch (err) {
        console.log('error:', err.stack);
    }
    
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}