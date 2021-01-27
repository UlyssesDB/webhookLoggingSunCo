
This script uses an express server and nrgrok in order to capture and record webhook events from a Sunshine Conversations Webhook integration.

REQUIREMENTS
1. NodeJS and npm 
    (these are bundled together and can be installed by following the instructions here: https://nodejs.org/en/ - you will most likely want to select the LTS version)
2. ngrok
    (follow these instructions to install, sign up for an account, and authenticate ngrok on your computer: https://ngrok.com/download)
3. An ngrok domain 
    (this is necessary if you want a static webhook target, if you do not have one or are not sure what your ngrok domain is, let me (Ulysses) know and I'll generate a new one) 
    (this program is still usable without an ngrok domain - the difference being that you will need to run the program, grab the 'webnhook target' listed in the terminal, and then manually update your webhook target in your Webhook integration each time you run the program)

INSTALLATION
1. Download the github repository > move it to desired location (ex. your Desktop) > unzip the repository if necessarry
2. Open a new terminal window (CMD + Space > terminal)
3. Change directory into the repository (ex. 'cd ~/Desktop/webhookLoggingSunCo')
4. Run 'npm install' in the terminal to install the required dependencies (if prompted during installation, hit 'y' and press enter)
5. open the 'config.js' file and update the 
    - "keyId" and "secret" with your SunCo app keyId:secret, 
    - update the "domain" with your ngrok domain (if left empty, the ngrok url generated when running the program will be random and you will need to update the webhook target in your Webhook integration accordingly)
    - it is not necessary to modify the "port"
    - save your changes and close the 'config.js' file

INSTRUCTIONS
1. Open a new terminal window (CMD + Space > terminal)
2. Change directory into the repository (ex. 'cd ~/Desktop/webhookLoggingSunCo')
3. Run 'node index.js' in the terminal
4. The terminal will notify you as to which port the express app is listening on, and what your webhook target url is (in case you need to update your Webhook target (see: https://docs.smooch.io/rest/v1/#update-webhook))
5. Any webhook events captured by your Webhook integration will be logged to the terminal window
6. All webhook events captured by your Webhook integration will be recorded in the 'logs.json' file for future reference
7. Press CTRL + C to stop the program when finished
