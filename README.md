# discord-token-listener

A program that uses a discord token to logs all DM messages into text files.


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

``SENT [SENDER] : [HOUR:MINUTE:SECOND] [MESSAGE]``

``RECEIVED [SENDER] : [HOUR:MINUTE:SECOND] [MESSAGE``

## Disclaimer

This program is for educational purposes only.
Only use this program with a token of a discord account that you own. 
I am not responsible for any damage caused by this program.
