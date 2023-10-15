const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('praise')
        .setDescription('Pray to the dark lord.'),
    async execute(interaction) {
        await interaction.reply("https://cdn.discordapp.com/attachments/375560558277296140/1102295199654359090/demon.gif");
    },
};