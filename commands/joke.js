const util = require('../util.js');
//var baseURL = "http://api.icndb.com/jokes/random?firstName=";
var baseURL = "http://api.icndb.com/jokes/random?escape=javascript"

exports.run = (client, message, args) => {
    util.jsonRequest(baseURL, function(data){
        if(data['type'] === 'success'){
            var joke = data["value"]["joke"];
            joke = joke.replace(/Chuck Norris/gi, message.author.username);
            joke = joke.replace(/Chuck/gi, message.author.username);
            joke = joke.replace(/Norris/gi, message.author.username);
            message.channel.send(joke);
            console.log(joke);
        } else{
            console.log("Could not fetch a joke :(");
        }
    });
}
