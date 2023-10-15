const { SlashCommandBuilder } = require('discord.js');
const axios = require("axios");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hacker')
        .setDescription('Check how many headshots they got')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('Who was in the game')
                .setRequired(true)),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false });
        const target = interaction.options.getUser('target')
        const values = {
            "abnormal01" : "Abnormal#RAT",
            "Bütter#8104" : "Bütter#smex",
            "nickvandc" : "nick#flop",
            "arthrovale#1027" : "arthrovale#bugs",
            "ravxnoak" : "ravxnoak#w33d",
            "cryptidcat" : "cryptid#worm",
            "classee":"classee#clown",

        }
        var valname = values[target.username]
        var data = []
        await axios({
            method: 'get',
            url: 'https://api.henrikdev.xyz/valorant/v3/matches/ap/'+ valname.split("#")[0]+ '/'+ valname.split("#")[1],
        }).then(res=> {
            
            res.data.data[0].rounds[0].player_stats.forEach(player =>{
                var player = {
                    name: player.player_display_name,
                    headshots: 0,
                    kills: 0,
                    nonheadshots: 0

                }
                data.push(player)
            })

           // console.log(JSON.stringify(res.data.data[0].rounds[5].player_stats[0]))
            var i  = 1
            res.data.data[0].rounds.forEach(round => {
                
                round.player_stats.forEach(player =>{
                   data.forEach(person =>{
                       

                       if(person.name==player.player_display_name){
                           person.headshots+=player.headshots
                           person.kills+=player.kills
                           person.nonheadshots+=player.legshots
                           person.nonheadshots+=player.bodyshots
                           player.kill_events.forEach(event =>{
                               if(event.killer_puuid == event.victim_puuid){
                                   person.kills-=1
                               }
                           })

                       }
                   })

                })

                i++
            })



        })
        str = []

        data.forEach(line =>{
            str.push(line.name + " has " + line.headshots + " headshots for "+ line.kills +" kills for a headshot percentage of " + (line.headshots ? ((line.headshots/(line.headshots+line.nonheadshots))*100).toFixed(2) : 0) + "%" )
        })
        await interaction.editReply("Headshot count:\n" + str.join("\n"));
    },
};