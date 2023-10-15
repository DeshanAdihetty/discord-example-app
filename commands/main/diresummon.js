const { SlashCommandBuilder } = require('discord.js');
const fs = require("fs");
const { MessageAttachment } = require('discord.js')

var msg
module.exports = {
    data: new SlashCommandBuilder()
        .setName('diresummon')
        .setDescription('Use only when all hope is lost')
        .addIntegerOption(option =>
            option.setName('eta')
                .setDescription('Input your estimated time in minutes')),

    async execute(interaction, client) {
       const guild = client.guilds.cache.get(interaction.guildId)
        var id
        guild.channels.fetch().then(async m => {
            m.map(u => {
                    if(u.name == "summoning"){
                        id = u.id
                    }

                }
            )

            if(interaction.options.getInteger('eta')){
                var today = new Date();
                today.setMinutes(today.getMinutes()+interaction.options.getInteger('eta'))
                var str
                if(today.getHours()>12){
                    var hours = today.getHours()-12
                    str = hours + ':'+ (today.getMinutes()<10?'0':'')+today.getMinutes().toString()
                }
                else{
                    str = today.getHours().toString()+ ':'+(today.getMinutes()<10?'0':'')+today.getMinutes().toString()
                }

                msg = await client.channels.cache.get(id).send({ content: "@everyone " + interaction.user.username + " is making a desperate plea for help in Valorant at " + str +" and so does:\nThese geese want to watch:", files: ['SadPercy.png'] })

            }
            else {

                msg = await client.channels.cache.get(id).send({ content: "@everyone " + interaction.user.username + " is making a desperate plea for help in Valorant and so does:\nThese geese want to watch:", files: ['SadPercy.png'] })

            }





            await fs.writeFileSync("./summon.json", JSON.stringify(msg), {
                encoding: 'utf8',
                flag: 'w'
            })
        interaction.reply({content: "May god have mercy on your souls...",ephemeral: true})
        })


    },




};