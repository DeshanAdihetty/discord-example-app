const { SlashCommandBuilder } = require('discord.js');


const {response} = require("express");
const fs = require('fs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('updatepp')
        .setDescription('Adds any new channel members to the Percy Pass.'),
    async execute(interaction,client) {


        const guild = client.guilds.cache.get(interaction.guildId)
        let newMembers = []
        guild.members.fetch().then(async m => {
            m.map(u => {
                    newMembers.push(u.user.username)

                }
            )

            var pp = JSON.parse(fs.readFileSync("./PP.json"));
            var flag = false
            var newpp = structuredClone(pp)
            var i = 0
            while (i < newMembers.length) {
                var j = 0
                while (j < pp.members.length) {

                    if (pp.members[j].name.toString() == newMembers[i].toString()) {

                        flag = true
                        break
                    }


                    j+=1

                }

                if (flag != true) {

                    newpp.members.push({"name": newMembers[i], "points": 0})
                    pp = JSON.parse(fs.readFileSync("./PP.json"));

                }
                flag = false
                i += 1

            }



                await fs.writeFileSync("./PP.json", JSON.stringify(newpp), {
                    encoding: 'utf8',
                    flag: 'w'


                })


            await interaction.reply("New members added to the Percy Pass. \n Enjoy your trip to pluto.")





        })

    }

};