const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs')
var pp = JSON.parse(fs.readFileSync("./PP.json"));
module.exports = {


    data: new SlashCommandBuilder()

        .setName('pp')
        .setDescription('Pay someone a Percy Point')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('Who do you want to pay')
                .setRequired(true)),

    async execute(interaction) {
        const target = interaction.options.getUser('target')
        if (interaction.user.username == target.username) {

            await interaction.reply("Nice try but no Percy said no infinite free money to youself (at least get a friend to scam with you).");
        } else {

            var pp = JSON.parse(fs.readFileSync("./PP.json"));
            var i = 0

            while (i < pp.members.length) {
                if (pp.members[i].name == target.username) {
                    pp.members[i].points += 1
                    break
                }
                i+=1


            }

            await fs.writeFileSync("./PP.json", JSON.stringify(pp), {
                encoding: 'utf8',
                flag: 'w'
            })
            await interaction.reply(interaction.user.username + " paid " + target.username + " a Percy Point");

        }
    }
}


