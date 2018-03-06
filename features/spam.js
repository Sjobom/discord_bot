// json files
const config = require("../config/config.json");
const message_history = require("../data/message_history.json");

// npm packages
const fs = require("fs-extra");
const moment = require('moment');


var check_authors_spam_time_limit = function (message) {
    if(!config.spam_protection_activated) {
        return Promise.resolve();
    }
    author_id = message.author.id;
    new_message = moment(message.createdAt);
    if(!message_history[author_id]){
        message_history[author_id] = [];
        console.log(message.author.username + " added to message history");
    }

    author_history = message_history[author_id];
    oldest_message = moment(author_history[0]);
    // Have enough messages been recorded?
    if(author_history.length >= config.spam_message_limit) {
        // if oldest message is more than time limit ago => PASS
        if(new_message.isAfter(oldest_message.add(config.spam_time_limit, 'seconds'))) {
            add_message_to_history(message);
            return Promise.resolve();
        } else { // the oldest recorded message was too close since this one
            var seconds_left = oldest_message.diff(new_message, 'seconds');
            return Promise.reject(seconds_left);
        }
    }
    add_message_to_history(message);
    return Promise.resolve();
};

var add_message_to_history = function (message) {
    author_history = message_history[message.author.id];
    if(author_history.length >= config.spam_message_limit) {
        author_history.shift();
    }
    author_history.push(message.createdAt);
    write_message_history_to_disk();
};

var write_message_history_to_disk = function() {
    fs.writeJsonSync('./data/message_history.json', message_history);
};

exports.check_authors_spam_time_limit = check_authors_spam_time_limit;

