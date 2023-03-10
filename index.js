import { Client, GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';
import { dall } from './commands/dall.js';
import { gpt } from "./commands/gpt.js";
dotenv.config();
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

import http from 'http';

http.createServer(function(req, res) {
	res.write("I'm alive");
	res.end();
}).listen(process.env.PORT || 8000);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
  if(interaction.commandName === "gpt") {
    await gpt(interaction);
  }
  if(interaction.commandName === "dall"){
    await dall(interaction);
  }
});

client.login(process.env.doken);