// json files
const config = require("../config/config.json");
const auth = require("../config/auth.json");
const conversation_states = require("../data/conversation_state.json");

// imports
const fs = require("fs-extra");
const util = require('../util.js');

// global variable
const cleverbot_url = 'https://www.cleverbot.com/getreply?key={API_KEY}&input={INPUT}&cs={CONVERSATION_STATE}';


/**
 *  This conversation module uses the cleverbot API to reply to the user
 *  https://www.cleverbot.com/api
 */


var ask = function(message) {
    return new Promise( function(resolve, reject) {
        var url = cleverbot_url.slice(0);
        if(!auth.cleverbot_api_key){
            console.log("No cleverbot API key present!")
            reject("No cleverbot API key present!");
        }
    
        // add cleverbot API key to url
        url = url.replace('{API_KEY}', auth['cleverbot_api_key']);
    
        // does the user have a conversation state with cleverbot?
        if(conversation_states[message.author.id]) {
            url = url.replace('{CONVERSATION_STATE}', conversation_states[message.author.id]);
        } else {
            url = url.replace('&cs={CONVERSATION_STATE}', '');
        }
    
        // add input to url
        input = message.content.substr(message.content.indexOf(" ") + 1); //remove <@bot_id>
        url = url.replace('{INPUT}', encodeURIComponent(input));
        
        console.log("making cleverbot request to\n" + url);
        try{
            util.jsonRequest(url, function(data){
                // save users conversation state
                conversation_states[message.author.id] = data['cs'];
                fs.outputJsonSync('./data/conversation_state.json', conversation_states);
    
                // return cleverbots reply
                reply = data['output'];
                resolve(reply);
            });    
        } catch(error){
            console.error(error);
            reject("HTTP error");
        }
    });
    

};

exports.ask = ask;