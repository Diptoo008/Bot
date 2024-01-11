const dipto = require('axios');
const fs = require('fs-extra');
module.exports.config = {
  name: "uptime",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "Mirai Team",
  usePrefix: true,
  description: "uptime bby",
  commandCategory: "system",
  cooldowns: 5,
  dependencies: {
    "pidusage": ""
  }
};

function byte2mb(bytes) {
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let l = 0, n = parseInt(bytes, 10) || 0;
  while (n >= 1024 && ++l) n = n / 1024;
  return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}

module.exports.languages = {
  "en": {
    "returnResult": "BOT has been working for %1 hour(s) %2 minute(s) %3 second(s).\n\n❖ Total users: %4\n❖ Total Threads: %5\n❖ Cpu usage: %6%\n❖ RAM usage: %7\n❖ Ping: %8ms"
  }
}
//▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮▮
module.exports.run = async ({ api, event, getText }) => {
  const imgur = ["https://i.imgur.com/GR3faPD.jpeg", "https://i.imgur.com/STpU5No.jpeg",
"https://i.imgur.com/0oVYREA.jpeg",
"https://i.imgur.com/GEwcB65.jpeg",               "https://i.imgur.com/PY9P0Zd.jpeg",
"https://i.imgur.com/evlUyfV.jpeg"]
  const link = imgur[Math.floor(Math.random() * imgur.length)];
  const res = await dipto.get(link, { responseType: 'arraybuffer' })
  const filename = __dirname + `/cache/up.jpeg`;
  fs.writeFileSync(filename, Buffer.from(res.data, 'binary'));
  const time = process.uptime();
  const hours = Math.floor(time / (60 * 60));
  const minutes = Math.floor((time % (60 * 60)) / 60);
  const seconds = Math.floor(time % 60);
  const pidusage = await global.nodemodule["pidusage"](process.pid);
  const timeStart = Date.now();
  return api.sendMessage({
      attachment: fs.createReadStream(filename),
      body: getText(
        "returnResult",
        hours,
        minutes,
        seconds,
        global.data.allUserID.length,
        global.data.allThreadID.length,
        pidusage.cpu.toFixed(1),
        byte2mb(pidusage.memory),
        Date.now() - timeStart
      )},
    event.threadID,
      () => fs.unlinkSync(filename),
    event.messageID
  );
}
