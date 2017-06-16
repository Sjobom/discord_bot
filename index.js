const Discord = require('discord.js');
const client = new Discord.Client();

const token = "MzI1Mzk2NzM3MDQyOTM5OTA1.DCXssg.0eRNmVINKlvdscGbbJlJL5X1uZg";


client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  if (message.content.includes("fan")) {
    message.author.id
    message.channel.send('Det där var fult sagt');
  }
});

client.login(token);