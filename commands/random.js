const util = require("../util.js");
const request = require("request");

const baseURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=funny";

exports.run = (client, message, args) => {
    //addArgumentsToUrl(args, baseURL, function(url) {
        try{
            util.jsonRequest(baseURL, function(data){
                gif_url = data["data"]["image_original_url"];
                /*
                if(gif_url === null){
                    util.jsonRequest(baseURL, function(data){
                        gif_url = data["data"]["image_original_url"];
                    });
                }
                */
                message.channel.send(util.embedPicture(gif_url));
            });    
        } catch(error){
            console.error(error);
        }
    //});
    
}

/*
function addArgumentsToUrl(fArgs, fUrl, callback){
    console.log(fArgs);
    if(fArgs === []){
        console.log("I WAS HERE");
        fUrl += "rebecca+black";
    }
    else{
        for(arg in fArgs){
            fUrl += fArgs[arg];
            if(arg < fArgs.length - 1){
                fUrl += "+";
            }
        }
    }
    callback(fUrl);
}
*/