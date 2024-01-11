const PastebinAPI = require('pastebin-js');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

module.exports.config = {
  name: "install",
  version: "1.0",
  credits: "Blake Cyphrus",//gor just change it, it's ok with me WHAAHHAHA Labyoy☺️
  description: "Install a module or command from a Pastebin link.",
  usePrefix: true,
  commandCategory: "Utility",
  cooldowns: 5,
  usages: " (filename) (pastebin link)."
};

module.exports.run = async function ({ api, event, args, content }) {
  let adminonly = ["100044327656712", "100044327656712"]; // put your uid there

  try {
    if (!adminonly.includes(event.senderID)) {
      return api.sendMessage("Sorry, you don't have permission to use this command.", event.threadID);
    }

    if (args.length !== 2) {
      return api.sendMessage('Invalid usage. Please check: !help install', event.threadID);
    }

    let filename = args[0];
    let pastebinLink = args[1];

    try {
      const response = await axios.get(pastebinLink);
      if (response.status === 200) {
        let moduleDirectory = './commands/';
        let filePath = path.join(__dirname, '..', moduleDirectory, filename);
        fs.writeFileSync(filePath, response.data);
        api.sendMessage(`Installed ${filename} successfully in your commands.`, event.threadID);
      } else {
        api.sendMessage(`Error: Unable to install the module or command. HTTP Status: ${response.status}`, event.threadID);
      }
    } catch (error) {
      api.sendMessage(`Error: Unable to install the module or command. Details: ${error.message}`, event.threadID);
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
};
