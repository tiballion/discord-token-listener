let fs = require('fs');
let path = require('path');

class Message {

    constructor(date, author, content, channel, attachments) {
        this.date = date;
        this.author = author;
        this.content = content;
        this.channel = channel;
        this.attachments = attachments;
        this.recipient = channel.recipient;
    }

    static fromDiscordMessage(message) {
        let date = Message.extractDate(message);
        let author = message.author;
        let content = message.content;
        let channel = message.channel;
        let attachments = message.attachments;

        return new Message(date, author, content, channel, attachments);
    }

    static extractDate(message) {
        let date = message.createdAt;
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        if (day < 10) day = '0' + day;
        if (month < 10) month = '0' + month;
        if (hour < 10) hour = '0' + hour;
        if (minute < 10) minute = '0' + minute;
        if (second < 10) second = '0' + second;
        return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
    }

    /**
     * Returns a string representation of the message.
     * @returns {string}
     */
    toString() {
        let res = `${this.author.username}#${this.author.discriminator} - ${this.content}`;
        if(this.attachments.size > 0) {
            res += '\nAttachments :';
            this.attachments.forEach(attachment => {
                res += `\n${attachment.name} : ${attachment.url}\n`;
            });
        }
        return res;
    }

    /**
     * Returns a string representation of the message with the date
     * @returns {string} 
     */
    toStringDate() {
        let res = this.date;
        res += ' ';
        res += this.toString();
        return res;
    }

    /**
     * Writes the message into a file.
     * The file is named after the date of the message and is placed in a folder named after the channel.
     */
    writeFile(edit = false) {
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // check si y'a des attachments, si oui afficher le name et l'url
        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        let messageFolder = path.join(__dirname, 'messages');
        // Checks if the folder of the user exists
        let userFolder = path.join(messageFolder, `${this.recipient.username}#${this.recipient.discriminator}`);
        if (!fs.existsSync(userFolder)) {
            fs.mkdir(userFolder, (err) => {
                if (err) throw err;
            });
        }
        // Checks if there is a folder for the day
        let date = this.date.split(' ')[0];
        // Replaces the / with a - to avoid problems with the path
        date = date.replace(/\//g, '-');
        // Creates the file for the day
        let userFile = path.join(userFolder, date);
        userFile += '.txt';
        if (!fs.existsSync(userFile)) {
            fs.writeFile(userFile, '', (err) => {
                if (err) throw err;
            });
        }
        // Writes the message into the file
        let messageTime = this.date.split(' ')[1];
        let message = edit ? 'EDITED ' : 'SENT ';
        message += `${this.author.username} : ${messageTime} - ${this.content} \n`;
        if (this.attachments.size > 0) {
            this.attachments.forEach(attachment => {
                message += `--> ${attachment.name} : ${attachment.url} \n`;
            });
        }
        fs.appendFile(userFile, message + '', (err) => {
            if (err) throw err;
        });
    }
}

module.exports = {Message};