const { SlashCommandBuilder} = require('discord.js');
const fs = require("fs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('swap')
        .setDescription('Swap between joining or watching (peanut) the summoning')
        .addIntegerOption(option =>
            option.setName('eta')
                .setDescription('Input your estimated time in minutes.')),
    async execute(interaction, client) {
        var summon = JSON.parse(fs.readFileSync("./summon.json"));
        interaction.client.channels.cache.get(summon.channelId).messages.fetch(summon.id)
            .then(async message => {
                var msg = message.content.toString()

                if (msg.includes(interaction.user.username)) {
                    var i = 0
                    var name
                    var split
                    var lines = msg.split("\n")
                    for (const line of lines) {
                        if (line.includes(interaction.user.username)) {
                            if(i == 0){

                                 return await interaction.reply({content: "You started the summon and I can't be bothered coding a way for you to swap you flop. Follow through with your commitments.",ephemeral: true})

                            }
                            else{

                                name = i
                            }

                        }
                        if (line.includes("These geese want to watch:")) {
                            split = i
                        }
                        i++

                    }
                    if(name<split){

                        lines.splice(name,1)

                        if(interaction.options.getInteger('eta')){
                            var today = new Date();
                            today.setMinutes(today.getMinutes()+interaction.options.getInteger('eta'))
                            var str
                            if(today.getHours()>12){
                                var hours = today.getHours()-12
                                str = hours + ':'+(today.getMinutes()<10?'0':'') + today.getMinutes().toString()
                            }
                            else{
                                str = today.getHours().toString()+ ':'+(today.getMinutes()<10?'0':'')+today.getMinutes().toString()
                            }
                            lines.push( interaction.user.username + " ETA " + str)
                        }
                    else {
                            lines.push(interaction.user.username)
                        }

                    }
                    else{
                        lines.splice(name,1)
                        if(interaction.options.getInteger('eta')) {
                            var today = new Date();
                            today.setMinutes(today.getMinutes() + interaction.options.getInteger('eta'))
                            var str
                            if (today.getHours() > 12) {
                                var hours = today.getHours() - 12
                                str = hours + ':' + today.getMinutes().toString()
                            } else {
                                str = today.getHours().toString() + ':' + today.getMinutes().toString()
                            }
                            lines.splice(1,0, interaction.user.username + " ETA " + str)
                        }
                    else{
                            lines.splice(1,0, interaction.user.username)
                        }

                    }

                    msg = lines.join('\n')
                    message.edit(msg)
                    client.channels.fetch(summon.channelId)
                        .then(
                            channel=>{
                                channel.send('Someone swapped in the summoning ...')
                            })


                    await interaction.reply({content: "You have swapped",ephemeral: true})
                }
                else{
                    await interaction.reply({content: "You are not in the summoning, /join or /peanut.",ephemeral: true})
                }
            })
    }
}

















