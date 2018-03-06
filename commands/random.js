const util = require("../util.js");
const request = require("request");
const spam = require("../features/spam.js");
const config = require("../config/config.json");

var baseURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=";

exports.run = (client, message, args) => {
        spam.check_authors_spam_time_limit(message)
        .then(function (data) {
            // If the author has not been spamming he/she can now request a gif!
            var url = baseURL;
            
            if(args != undefined){
                for(arg in args){
                    url += args[arg];
                    if(arg < args.length - 1){
                        url += "+";
                    }
                }
            }

            try{
                util.jsonRequest(url, function(data){
                    gif_url = data["data"]["image_original_url"];
                    message.channel.send(util.embedPicture(gif_url));
                });    
            } catch(error){
                console.error(error);
            }
        })
        .catch(function rejected(seconds_left) {
            // Author have been spamming and is not allowed to request gifs!
            //message.
            reply = message.member + " " + seconds_left + " seconds until you can request a gif again ";
            reply += " (" + config.spam_message_limit + " gifs within " + config.spam_time_limit + " seconds allowed)";
            message.delete();
            message.channel.send(reply);
        });
        
}