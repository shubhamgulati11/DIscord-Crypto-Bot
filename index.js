const keepAlive = require("./server")
const Discord = require("discord.js");
const fetch = require("node-fetch");
//import fetch from 'node-fetch';

const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});
const mySecret = process.env['token']

async function getData(assety){
  const d = await fetch("https://data.messari.io/api/v1/assets/"+assety+"/metrics/market-data");
  let res = await d.json();
  //console.log(res.data.market_data.price_usd);
  return res;
}

client.on("ready",() => {
  console.log('Logged in as $ {client.user.tag}')
})

client.on("message",async msg =>{
  //if(author.msg.bot){return}
  
  if(msg.content==="ping"){
    msg.reply("pong")
  }else if(msg.content.startsWith("$")){
    let assety=msg.content.substring(1);
    console.log(assety)
    let res = await getData(assety);
    console.log(res);
    if(res.error_code){
      msg.reply("Wrong value")
    }else{
      msg.reply(String(res.data.market_data.price_usd));
    }
  }
})

keepAlive()
client.login(mySecret)


//Some Commands: $btc, $etc
