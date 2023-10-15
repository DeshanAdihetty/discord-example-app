
const { shuffle } = require('weighted-shuffle')
const { SlashCommandBuilder } = require('discord.js');
var rm = ["Naz", "PercyCorp™"]
module.exports = {

    data: new SlashCommandBuilder()
        .setName('assign')
        .setDescription('Give everyone a random val agent.')
        .addUserOption(option =>
        option.setName('target')
            .setDescription('Who do you want to pay')),
    async execute(interaction, client) {
        agents = ({"Pluto" : 1,"Astra" : 1, "Breach" :10, "Brimstone" : 10, "Chamber" : 10, "Cypher" : 10, "Gekko" : 10, "Harbor" : 10, "Jett" : 10, "Kay/O" : 10, "Killjoy" : 10, "Neon" : 10, "Omen" : 10, "Phoenix" : 10, "Raze" : 10, "Reyna" : 10, "Sage" : 10, "Skye" : 10, "Sova" : 10, "Viper" : 10,"Yoru" : 10})
        agents2 = ({"Astra" : 10, "Breach" :10, "Brimstone" : 10, "Chamber" : 10, "Cypher" : 10, "Gekko" : 10, "Harbor" : 10, "Jett" : 10, "Kay/O" : 10, "Killjoy" : 10, "Neon" : 10, "Omen" : 10, "Phoenix" : 10, "Raze" : 10, "Reyna" : 10, "Sage" : 10, "Skye" : 10, "Sova" : 10, "Viper" : 10,"Yoru" : 10})
        var mix = shuffle(agents)
        var mix2 = shuffle(agents2)

        if(interaction.options.getUser('target')){
            var agent = mix.pop()[0]
            if(agent == "Pluto"){
                await interaction.reply("The curse of Pluto is upon you " + interaction.options.getUser('target').username + " → " + mix2.pop()[0]);
            }
            else {
                await interaction.reply(interaction.options.getUser('target').username + " → " + agent);
            }
        }
        else {
            const guild = client.guilds.cache.get(interaction.guildId)
            let newMembers = []
            guild.members.fetch().then(async m => {
                m.map(u => {
                    if(!rm.includes(u.user.username)) {
                        newMembers.push(u.user.username)

                    }
                    }
                )
                var string = 'Random agents are: \n'
                newMembers.forEach(name => {
                    var agent = mix.pop()[0]
                    if(agent == "Pluto"){
                        mix["Astra"] = 10
                        mix = shuffle(mix)
                        string = string.concat("The curse of Pluto is upon you " + name + " → " + mix.pop()[0] + '\n')

                    }
                    else {
                        string = string.concat(name + " → " + agent + '\n')
                    }
                })

                await interaction.reply(string);
            })
        }
        },
};


