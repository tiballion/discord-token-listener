# discord-token-listener

A program that uses a discord token to logs all DM messages into text files.
_This program uses a modified version of the class js discord bot library in order for it to be able to run on non-bot accounts._

## How to use

To run this program run 
``git clone https://github.com/tiballion/discord-token-listener.git``

Then run ``npm install``

Then run ``node login.js``

Then enter your token and it will start listening for DM messages.

If you want to run it in the background on Linux/MacOS use ``nohup node login.js &``

To stop the program press ``CTRL + C``

## How it works
When you launch the application it will create a folder called ``messages`` and it will create a folder for each user channel where a message is received.

Inside the folder of each user there will be a text file with the date and in this file will be all the messages that the token sent and received from that user.

The message will be in one of the following formats:

``MESSAGE [SENDER] : [HOUR:MINUTE:SECOND] [MESSAGE]``

``RECEIVED [SENDER] : [HOUR:MINUTE:SECOND] [MESSAGE``

The file structure will look like this:

```
messages
├── [friend1#0001]
│   ├── [07-12-2022].txt
│   └── [08-12-2022].txt
└── [friend2#2000]
│   ├── [07-12-2022].txt
│   └── [08-12-2022].txt
```

And the inside of a file will look like this:

```
MESSAGE [friend1#0001] : [12:00:00] Message
MESSAGE [friend2#2000] : [12:00:01] 😄
EDITED [friend1#001] : [12:00:00] Edited message
```

_You can identify which message is edited by looking at the time the edited message was edited (although im working on improving this)_

## Disclaimer

This program is for educational purposes only.
Only use this program with a token of a discord account that you own. 
I am not responsible for any damage caused by this program.
