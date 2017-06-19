const picture_links = require("./pictures/picture_links.json");

exports.run = (client, message, args) => {
    console.log("I was here");
    var name = args[0];
    var link = args[1];

    if(picture_links[name] === null){
        picture_links[name] = link;
        message.reply("OK, I can send you that pic now :)");
    }
    else{
        message.reply("Sorry, that spot was taken, or you didn't send me a real link");
    }



}


function ValidURL(str) {
  var pattern = new RegExp('^(https?:\/\/)?'+ // protocol
    '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
    '((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
    '(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ // port and path
    '(\?[;&a-z\d%_.~+=-]*)?'+ // query string
    '(\#[-a-z\d_]*)?$','i'); // fragment locater
  if(!pattern.test(str)) {
    //alert("Please enter a valid URL.");
    return false;
  } else {
    return true;
  }
}