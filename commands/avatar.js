exports.run = (client, message, args) => {
    message.reply({
            "embed": {
                "image": {
                    "url": message.author.avatarURL,
                }
            }
        });
}