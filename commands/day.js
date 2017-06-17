const weekDays = ["" ,"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

exports.run = (client, message, args) => {
    var day = new Date().getDay();
    var emoji = " :sob:";
    if(weekDays[day] === "Friday"){
        emoji = " :smile::smile::smile:";
    }
    message.channel.send("It's " + weekDays[day] + emoji);

}

