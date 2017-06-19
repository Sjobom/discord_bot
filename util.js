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

exports.embedPicture = embedPicture;
exports.jsonRequest = jsonRequest;
