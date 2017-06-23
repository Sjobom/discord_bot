const request = require("request");


var embedPicture = function(url){
    return {
        "embed": {
            "image": {
                "url": url,
            }
        }
    };
};

var jsonRequest = function(URL, handleJsonCallback){
    request({
        url: URL,
        json: true,
    }, function(error, response, body){
            if (!error && response.statusCode === 200){
            handleJsonCallback(body);

            }
            else{
                console.error(error);
            }
    });
};

var playSound = function(client, message, url){
    if (message.member.voiceChannel){
        message.member.voiceChannel.join()
            .then(connection => {
                const dispatcher = connection.playFile(url);
                dispatcher.on('end', ()=> {
                    message.member.voiceChannel.leave();
                });
            })
    }
}
exports.embedPicture = embedPicture;
exports.jsonRequest = jsonRequest;
exports.playSound = playSound;
