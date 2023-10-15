const { SlashCommandBuilder } = require('discord.js');
const fs = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clip')
        .setDescription('Upload a clip.')
        .addAttachmentOption(option => option.setName('clip').setDescription("Upload a clip")
            .setRequired(true)),
    async execute(interaction, client) {

        const guild = client.guilds.cache.get(interaction.guildId)
        var id
        guild.channels.fetch().then(async m => {
            m.map(u => {
                    if (u.name == "clips-and-highlights") {
                        id = u.id
                    }

                }
            )

            msg = await client.channels.cache.get(id).send(interaction.options.getAttachment('clip').url)

        var img = JSON.parse(fs.readFileSync("./clip.json"));
        img.clips.push(interaction.options.getAttachment('clip').url)
        await fs.writeFileSync("./clip.json", JSON.stringify(img), {
            encoding: 'utf8',
            flag: 'w'
        })

        })
        interaction.reply({content: "Your clip has been uploaded.",ephemeral: true})
    },
};