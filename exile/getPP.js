const { SlashCommandBuilder } = require('discord.js');
const axios = require("axios");
const fs = require("fs");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('getpp')
        .setDescription('Load PP from match history'),
    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: false });
        var names = []
        await axios({
            method: 'get',
            url: 'https://api.henrikdev.xyz/valorant/v3/matches/ap/nick/flop',
        }).then(res=> {
            const values = {
                "Abnormal#RAT": "Deshan",
                "Bütter#smex": "Bütter",
                "nick#flop": "nickvandc",
                "arthrovale#bugs": "arthrovale",
                "ravxnoak#w33d": "ravxnoak",
                "cryptid#worm": "cryptidcat",
                "classee#clown": "classee",


            }
            var valNames = []

            res.data.data[0].rounds.forEach(round => {

                round.player_stats.forEach(player_stats =>{

                    player_stats.kill_events.forEach(kill_events => {

                           kill_events.assistants.forEach(assistants =>{
                                if(assistants.assistant_display_name === 'nick#flop'){
                                    valNames.push(kill_events.killer_display_name)
                                }
                            })



                    })
                })
            })



            valNames.forEach(val => {
              if(values[val]){
                  names.push(values[val])
              }

            })

        })
        var pp = JSON.parse(fs.readFileSync("./PP.json"));
        var flag = false
        for (const name of names) {

            var i = 0
            var top = pp.members[0]
            while (i < pp.members.length) {


                if (pp.members[i].name === name) {
                    pp.members[i].points += 1
                    flag = true
                }
                if(top.points<pp.members[i].points && pp.members[i].name !== "PercyCorp™"){

                    top = pp.members[i]

                }
                i++


            }
            pp.members.find(member =>{
                return member.name === "PercyCorp™"
            }).points = top.points+3
            await fs.writeFileSync("./PP.json", JSON.stringify(pp), {
                encoding: 'utf8',
                flag: 'w'
            })

            msg = await client.channels.cache.get(interaction.channelId).send(name + " Gained a Percy Point")


        }
       if(flag === false){
           msg = await client.channels.cache.get(interaction.channelId).send("Not a single Percy Point was added yet still Percy laughs... Someone is being sent to Pluto")
       }
        await interaction.editReply("Percy points updated");
    }

    }