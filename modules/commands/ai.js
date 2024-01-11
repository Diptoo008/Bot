const axios = require('axios');

module.exports.config = {
    name: "ai",
    version: '1.0.0',
    author: "dipto",
    hasPermssion:0,
    usePrefix: true,
    description: "AI with no prefix just question with(?)",
    commandCategory: "ai",
    usages: "Only Question with [?]",
    cooldowns:5
  },
module.exports.run = async function () {},
module.exports.handleEvent = async function ({ api, event }) {
  var dipto = event.body ? event.body.toLowerCase() : '';
if (dipto.endsWith('?')) {
  prompt = dipto.slice(0, -1);
  if (event.type === "message_reply"){ return; } else {
    try {
   if (!prompt) {
        await api.sendMessage("Please provide questions🐤", event.threadID);
        return;
      }
api.setMessageReaction("🐤", event.messageID, () => {}, true);
      const response = await axios.get(`https://ai-d1pt0.onrender.com/ok?prompt=${encodeURIComponent(prompt)}`);
      const answer = response.data.data;
 api.setMessageReaction("✅", event.messageID, () => {}, true);
    await api.sendMessage(answer, event.threadID,event.messageID);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
}
  };
