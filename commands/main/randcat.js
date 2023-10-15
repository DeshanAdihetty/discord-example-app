const { SlashCommandBuilder  } = require('discord.js');
const Discord = require('discord.js');
const fs = require("fs");
const path = require('path');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('randcat')
        .setDescription('Get a random cat.'),
    async execute(interaction) {
        if (!interaction.isCommand()) return;

        const { commandName } = interaction;

        if (commandName === 'randcat') {
            const imagesDirectory = "./images"; // Specify the directory where the images are stored
            await interaction.deferReply(); // Defer the reply to prevent timeouts
            try {
                const files = fs.readdirSync(imagesDirectory);
                const imageFiles = files.filter(file => {
                    const extension = path.extname(file).toLowerCase();
                    return extension === '.png' || extension === '.jpg' || extension === '.jpeg';
                });

                if (imageFiles.length === 0) {
                    interaction.reply('No image files found in the directory.');
                    return;
                }

                const randomIndex = Math.floor(Math.random() * imageFiles.length);
                const randomImage = imageFiles[randomIndex];
                const imagePath = path.join(imagesDirectory, randomImage);

                if (interaction.replied) return; // Check if the interaction has already been replied to



                if (interaction.deleted) return; // Check if the interaction has been deleted

                await interaction.editReply({ files: [imagePath] });
            } catch (error) {
                console.error('Error occurred:', error);
                interaction.reply('An error occurred while processing the command.');
            }
        }
    }
};