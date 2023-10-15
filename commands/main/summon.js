const { SlashCommandBuilder } = require('discord.js');

const fs = require("fs");
var msg
module.exports = {
    data: new SlashCommandBuilder()
        .setName('summon')
        .setDescription('Summon up some friends.')
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

                msg = await client.channels.cache.get(id).send("@everyone " + interaction.user.username + " wants to play Valorant at " + str +" and so does:\nThese geese want to watch:")

            }
            else {
                msg = await client.channels.cache.get(id).send("@everyone " + interaction.user.username + " wants to play Valorant and so does:\nThese geese want to watch:")
            }





            await fs.writeFileSync("./summon.json", JSON.stringify(msg), {
                encoding: 'utf8',
                flag: 'w'
            })
        interaction.reply({content: "Summoning friends...",ephemeral: true})
        })


    },




};