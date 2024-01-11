const fs = require('fs-extra');
const axios = require('axios');
const getFBInfo = require("@xaviabot/fb-downloader");
const pathFile = __dirname + '/cache/3auto.txt';
if (!fs.existsSync(pathFile))
  fs.writeFileSync(pathFile, 'false');
  const isEnable = fs.readFileSync(pathFile, 'utf-8');
module.exports.config = {
  name: "auto",
  version: "1.0.0",
  hasPermssion: 1,
  credits: "Dipto",
  usePrefix: true,
  description: "Enable/disable Auto download",
  commandCategory: "Auto download by command",
  usages: "on/off",
  cooldowns: 5
};
module.exports.handleEvent = async function ({ api, event }) {
  let dipto = event.body ? event.body : '';
  if (this.config.credits !='\u0044\u0069\u0070\u0074\u006f') { 
return api.sendMessage('[ WARN ] maderchod' , event.threadID, event.messageID);}
  if (isEnable == "true"){
  if (dipto.startsWith('https://www.facebook.com') || dipto.startsWith('https://m.facebook.com')){
    const result = await getFBInfo(dipto)
   const wait = await api.sendMessage("𝗔𝗸𝘁𝘂 𝗪𝗮𝗶𝘁 𝗸𝗼𝗿𝗼 𝗯𝗮𝗯𝘆 <😘", event.threadID);
    { api.setMessageReaction("🐤", event.messageID, (err) => {}, true);
    }
    let path = __dirname + `/cache/fbVID2.mp4`;
     let vid = (await axios.get(encodeURI(result.sd),{ responseType:'arraybuffer'} )).data;
  fs.writeFileSync(path, Buffer.from(vid, 'utf-8'));
  api.sendMessage({
    body: `Naw baby Tumar video < 😘`,
    attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);
setTimeout(() => {
      api.unsendMessage(wait.messageID);
     }, 6000);
  }
//----------fb watch----------//
     if(dipto.startsWith('https://fb.watch')){
      let path = __dirname + `/cache/fbVID.mp4`;
    const aa = await axios.get(`https://759q5p-3000.csb.app/xnxx?url=${encodeURI(dipto)}`);
    const vid = (await axios.get(aa.data.video, { responseType: "arraybuffer", })).data;
    fs.writeFileSync(path, Buffer.from(vid, 'utf-8'));
    api.sendMessage({
      body: `downloaded!!!`,
      attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);}
//-------- Insta Video --------//
    if (dipto.startsWith("https://www.instagram.com/")){const waitMessage = await api.sendMessage("Downloading video, please wait...", event.threadID);
    const response = await axios.get(`https://759q5p-3000.csb.app/xnxx?url=${encodeURIComponent(dipto)}`);
    const videoURL = response.data.result;
    const path = __dirname + `/cache/instagram_video.mp4`;
    const videoData = (await axios.get(videoURL, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(path, Buffer.from(videoData, 'utf-8'));
    setTimeout(() => {
      api.unsendMessage(waitMessage.messageID);
    }, 6000);
    api.sendMessage({
      body: "Here's your video",
      attachment: fs.createReadStream(path),
    }, event.threadID, () => fs.unlinkSync(path));
  }//-------- TikTok download --------//
if(dipto.startsWith('https://vt.tiktok.com/')){
let path = __dirname + `/cache/tiktok_video.mp4`;
    let res = await axios.get(`https://759q5p-3000.csb.app/xnxx?url=${encodeURIComponent(dipto)}`);
  const data = res.data.result;
    const vid = (await axios.get(data, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(path, Buffer.from(vid, 'utf-8'));
    api.sendMessage({body: '𝗡𝗔𝘄 𝗕𝗮𝗯𝘆, 𝗔𝗯𝗮𝗹 𝗗𝗲𝗿 𝗩𝗶𝗱𝗲𝗼 <💩',attachment: fs.createReadStream(path)
    }, event.threadID, () => fs.unlinkSync(path), event.messageID)
}
//----------- Imgur Link Download -----------//
 if (dipto.startsWith('https://i.imgur.com')){
  const dipto3 = dipto.substring(dipto.lastIndexOf('.'));
  const response = await axios.get(dipto, { responseType: 'arraybuffer' });
const filename = __dirname + `/cache/dipto${dipto3}`;
    fs.writeFileSync(filename, Buffer.from(response.data, 'binary'));
    api.sendMessage({body: `Downloaded from link`,attachment: fs.createReadStream(filename)},event.threadID,
  () => fs.unlinkSync(filename),event.messageID)
}
//-------------Yt video --------------//
    if (dipto.startsWith('https://youtu.be/') || dipto.startsWith('https://youtube.com/'))
    {const waitMessage = await api.sendMessage("Downloading yt video, please wait...", event.threadID);
    const response = await axios.get(`https://759q5p-3000.csb.app/xnxx?url=${encodeURIComponent(dipto)}`);
    const videoURL = response.data.result;
    const path = __dirname + `/cache/yt_video.mp4`;
    const videoData = (await axios.get(videoURL, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(path, Buffer.from(videoData, 'utf-8'));
    setTimeout(() => {
      api.unsendMessage(waitMessage.messageID);
    }, 6000);
    api.sendMessage({
      body: "Here's your Yt video",
      attachment: fs.createReadStream(path),
    }, event.threadID, () => fs.unlinkSync(path));
    }
}
};
module.exports. run = async ({ api, event, args }) => {
  try {
  if (args[0] == 'on') {
    fs.writeFileSync(pathFile, 'true');
    api.sendMessage('auto download on successfully', event.threadID, event.messageID);
  }
  else if (args[0] == 'off') {
    fs.writeFileSync(pathFile, 'false');
    api.sendMessage('auto download off successfully', event.threadID, event.messageID);
  }
  else {
    api.sendMessage('Wrong format use auto off/on', event.threadID, event.messageID);
  }
  }
  catch(e) {
    console.log(e);
  }
};
