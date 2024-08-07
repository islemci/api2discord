const express = require('express');
const { Client, ActivityType } = require('discord.js');
const config = require('./config.json');
const app = express();
const port = 3000;
const bot = new Client({ intents: 0 });
const discordChannelId = config.bot.channel;

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}`);
  bot.user.setActivity('API requests', { type: ActivityType.Watching });
});

app.get('/', async(req, res) => {
  const userIP = req.ip;
  res.send('Hello, world!');

  const channel = await bot.channels.fetch(discordChannelId);
    channel.send(`User IP: ${userIP}`)
      .catch((error) => {
        console.log('Error sending IP address to Discord channel:', error);
      });
});

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});

bot.login(config.bot.token);
