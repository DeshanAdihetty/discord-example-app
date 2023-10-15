const { SlashCommandBuilder } = require('discord.js');
const QuickChart = require('quickchart-js');
const fs = require("fs");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ppchart')
        .setDescription('Shows a graph of the Percy Pass leaderboard.'),
    async execute(interaction) {
        var pp = JSON.parse(fs.readFileSync("./PP.json"));
        var names = []
        var points = []
        for(var i in pp.members){
            names.push(pp.members[i].name)
            points.push(pp.members[i].points)
        }
        const chart = new QuickChart();
        chart
            .setConfig({
                type: 'bar',

                data: { labels: names, datasets: [{data: points, backgroundColor: ['#FFEA00','#088F8F','#fa2a55',
                            '#A020F0','#90EE90','#A52A2A','#0000FF',
                            "#66ff66",'#aaf0d1','#16d0cb','#50bfe6','#9c27b0','#ee34d2','#ff00cc'], }, ] },
                options: {
                    legend: {
                        display: false, // Hide the legend
                    },
                    title: {
                        display: true,
                        text: 'Percy Pass Leaderboard'
                    },
                }


            })
            .setWidth(800)
            .setHeight(400);


        interaction.reply(chart.getUrl())
    },
};