const cron = require('node-cron');
const logger = require('./utils/log');
const axios = require("axios");
const fs = require('fs-extra');
//const PREFIX = true;
/*
const randomMessages = [
  "Hello Everyone",
  "Hello Everyone Gumawa naba kayo ng assignment niyo?",
  "Hello Everyone Kamusta School Niyo?",
  "Hello There I'm still alive",
  "Hello Everyone Be Respectful to others Thanks you",
  "How are you today?",
  "Greetings all to Members",
  "Hello Educator AI User Remember Don't Spam the Bot"
];
*/
function randomMessage(array) {
  return array[Math.floor(Math.random() * array.length)];
}
function sendGreeting(api, messages, filePath) {
  api.getThreadList(20, null, ['INBOX']).then((list) => {
    list.forEach((thread) => {
      if (thread.isGroup) {
const dipto = fs.createReadStream(filePath);
        api.sendMessage({body : randomMessage(messages),attachment: dipto}, thread.threadID).catch((error) => {
          logger(`Error sending message: ${error}`, 'AutoGreet');
        });
      }
    });
  }).catch((error) => {
    logger(`Error getting thread list: ${error}`, 'AutoGreet');
  });
}

module.exports = async ({ api }) => {
/*  const minInterval = 5;
  let lastMessageTime = 0;
  let messagedThreads = new Set();*/

  const config = {
    autoRestart: {
      status: false,
      time: 40,
      note: 'To avoid problems, enable periodic bot restarts',
    },
    acceptPending: {
      status: false,
      time: 30,
      note: 'Approve waiting messages after a certain time',
    },
    greetings: [
      {
        cronTime: '0 6 * * *', // At 05:00 AM
        messages: [`Good morning! Have a great day ahead!`],
        filePath: "videos/video4.mp4"
      },
      {
        cronTime: '0 5 * * *', // At 08:00 AM
        messages: [`°থাপ্পড়াইয়া কিডনী 𝙡𝙤𝙠 করে দিমু..!! 🐸🔪 Taratari ghum theke ut`],
        filePath: "videos/video3.mp4"
      },
      {
        cronTime: '0 4 * * *', // At 03:00 AM
        messages: [`Life update:\nAnd missing him`],
        filePath: "videos/Gr.mp4"
      },
      {
        cronTime: '0 2 * * *', // At 11:00 AM
        messages: [`Rat 2  baje gumaw sobay 🐤🐤`],
        filePath: "videos/g2.mp4"
      },
      {
        cronTime: '10 1 * * *',
        messages: [`Ar akta din chole gelo,Taw tumi porta bosla na💩🐤`],
        filePath : "videos/g.mp4"
      }
    ]
  };

  // Schedule predefined greeting messages
  config.greetings.forEach((greeting) => {
    cron.schedule(greeting.cronTime, async () => {sendGreeting(api, greeting.messages, greeting.filePath);
    }, {
      scheduled: true,
      timezone: "Asia/Dhaka"
    });
  });
  cron.schedule('*/15 * * * *', () => {
   // sendGreeting(api, randomMessages);
 const res = axios.get('https://be837cf3-13dd-4b6a-b3c1-7995190c0310-00-16sbkns9m75e3.sisko.replit.dev/',{responseType: 'arraybuffer'})
    const data = res.data;
    console.log(data)
  }, {
    scheduled: false,
    timezone: "Asia/Dhaka"
  }); 
  // Auto-restart logic
  if (config.autoRestart.status) {
    cron.schedule(`*/${config.autoRestart.time} * * * *`, () => {
      logger('Start rebooting the system!', 'Auto Restart');
      process.exit(1);
    });
  }

  // Accept pending messages logic
  if (config.acceptPending.status) {
    cron.schedule(`*/${config.acceptPending.time} * * * *`, async () => {
      const list = [
        ...(await api.getThreadList(1, null, ['PENDING'])),
        ...(await api.getThreadList(1, null, ['OTHER'])),
      ];
      if (list[0]) {
        api.sendMessage('Hello', list[0].threadID);
      }
    });
  }
};
