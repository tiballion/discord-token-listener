const Message = require('./message.js').Message;
const { Client, SystemChannelFlags } = require('discord.js-selfbot-v13');
const prompt = require('prompt-sync')({sigint: true});
let fs = require('fs');
let path = require('path');

const client = new Client({
    checkUpdate : false,
});


client.on('messageCreate' , async (message) => {
    if (message.channel.type === 'DM') {
        m = Message.fromDiscordMessage(message);
        console.log(m.toString());
        m.writeFile();
    }
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
    if (newMessage.channel.type === 'DM') {
        m = Message.fromDiscordMessage(newMessage);
        console.log(`EDIT : ${m.toString()}`);
        m.writeFile(true);
    }
});

client.on('ready', () => {
    t2 = Date.now();
    console.log(`Logged in as ${client.user.username}#${client.user.discriminator} in ${t2 - t1}ms`);
    console.log("Listening for messages...");

    // Checks if the message folder exists, if it doesn't exist, it creates it
    let messageFolder = path.join(__dirname, 'messages');
    if (!fs.existsSync(messageFolder)) {
        fs.mkdir(messageFolder, (err) => {
            if (err) throw err;
        });
    }
});

client.login(prompt('Token: '));
t1 = Date.now();