const { SlashCommandBuilder } = require('discord.js');
const execSync = require('child_process').execSync;
// import { execSync } from 'child_process';  // replace ^ if using ES modules



module.exports = {
    data: new SlashCommandBuilder()
        .setName('lab')
        .setDescription("Get the address of Percy's lab (try not to dox me :D)"),
    async execute(interaction) {
               
          const output = execSync('nslookup myip.opendns.com. resolver1.opendns.com', { encoding: 'utf-8' });  // the default is 'buffer'
          inputString = output
          const ipPattern = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g;

          // Use match to find all IP addresses in the input string
          const ipAddresses = inputString.match(ipPattern);
          
          // Check if at least two IP addresses are found and extract the second one
          if (ipAddresses && ipAddresses.length >= 2) {
            const secondIP = ipAddresses[1];
            await interaction.reply('http://'+secondIP+':5525 <- Welcome to the lab, try not to dox me');

          } else {
            interaction.reply("There was an error, try again later (or tell desh)");
          }


       
    },
};
