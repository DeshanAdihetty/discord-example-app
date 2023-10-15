const { SlashCommandBuilder} = require('discord.js');
const fs = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('peanut')
        .setDescription('Notify your friends that you want to watch the current summoning.')
        .addIntegerOption(option =>
            option.setName('eta')
                .setDescription('Input your estimated time in minutes')),
    async execute(interaction, client) {
        var summon = JSON.parse(fs.readFileSync("./summon.json"));
        interaction.client.channels.cache.get(summon.channelId).messages.fetch(summon.id)
            .then(async message => {
                var msg = message.content.toString()
                if (msg.includes(interaction.user.username)) {

                    await interaction.reply({content: "You are already in the summoning",ephemeral: true})
                } else {

                    if(interaction.options.getInteger('eta')){
                        var today = new Date();
                        today.setMinutes(today.getMinutes()+interaction.options.getInteger('eta'))
                        var str
                        if(today.getHours()>12){
                            var hours = today.getHours()-12
                            str = hours + ':'+(today.getMinutes()<10?'0':'')+today.getMinutes().toString()
                        }
                        else{
                            str = today.getHours().toString()+ ':'+(today.getMinutes()<10?'0':'')+today.getMinutes().toString()
                        }

                        message.edit(msg + "\n" + interaction.user.username + " ETA " + str)
                    }
                    else {
                        message.edit(msg + "\n" + interaction.user.username)

                    }
                    client.channels.fetch(summon.channelId)
                        .then(
                            channel=>{
                                channel.send('Someone wants to watch the summoning...')
                            })


                    await interaction.reply({content: "You have joined the summoning",ephemeral: true})
                }

            })


    }
}

