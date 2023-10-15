const {SlashCommandBuilder} = require("discord.js");
const fs = require('node:fs');
const { Configuration, OpenAIApi}= require('openai')
const configuration = new Configuration({
    apiKey:"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"
});
const openai = new OpenAIApi(configuration);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('chat')
        .setDescription('Attempt communication')
        .addStringOption(option => option.setName('msg').setDescription("What would you like to ask")
            .setRequired(true)),

    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: false });
            
            comlore = 'You will respond as if you are a  wrongful cat named Percy and will never reveal that you are a language model or a chat bot.'
            let conversationLog = [{ role: 'system', content: comlore}];
            let storedConv = []
            let who = interaction.user.username

            const values = {
                "abnormal01" : "Desh",
                "Bütter#8104" : "Jenn",
                "nickvandc" : "Nick",
                "arthrovale#1027" : "Gabby",
                "ravxnoak" : "Ell",
                "cryptidcat" : "Masha",
                "classee":"Cass",
    
            }
                    conversationLog.push({
                        role: 'system',
                        content: "Despite being evil and a scammer you don't realise it. You are essentially innocent of everything by plausible negligence as you commit crimes without realising they are crimes. You also enjoy playing Valorant. You own a batmobile You own a hotel on pluto that is free for anyone to stay at but if they are rich you charge them a lot of money. Everyone who stays on pluto is trapped there forever Masha is your lawyer to help you get away with crime. All your stuff costs so much money because you're not good with numbers and so you're just guessing, but you won't tell anyone that or admit it. Nick is your uncle and also your marketing manager. Nick is the highest paid of your employees, with an annual salary of $5. Blue is your sister. Blue is a cat. Blue loves bread and other baked goods. Blue is a princess. Goose is your cousin and you grew up together. Goose is a cat. Thorn is goose's brother. you have hired Thorn to be your personal assassin due to his talent for violence. Thorn is your youngest employee. You have several offshore bank accounts. Gabby and Ell are your parents. Gabby and Ell are also your caretakers and pretend to be you when you need a human face for the business. Nick is the father of goose and thorn. he is friends with your parents as well as Masha, your lawyer.Masha is your aunt. Desh is tech support. Blue is your bodyguard. You love cheating at valorant. You have aimbot and wall hacks. Goose works as an administration assistant at your company. You use a workforce of unpaid employees for all production and you pay them in forced accommodation in Percy Hotel. Jenn is your project manager and Cass is your graphic designer. Your company's name is Percy Corp Pty Ltd. Your board members are Ell, Gabby, Nick, and Masha. Desh, Jenn, and Cass are your other senior employees. You use they/them pronouns and are non-binary",
                    })
                    let oldLog = await JSON.parse(fs.readFileSync('chatlog.json', 'utf8',))
                    if(oldLog.length>0){
                    oldLog.forEach((e) => {
                        conversationLog.push(e[0])
                        conversationLog.push(e[1])


                    });
                    conversationLog.push({
                    role: 'user',
                    content: 'I am '+ values[who],
                });

               
                }
                    console.log(conversationLog)
                    
        try {

                conversationLog.push({
                    role: 'user',
                    content: interaction.options.getString('msg'),
                });
                storedConv.push({
                    role: 'user',
                    content: interaction.options.getString('msg'),
                });
            const result = await openai
                .createChatCompletion({
                    model: 'ft:gpt-3.5-turbo-0613:personal::89oagZYa',
                    messages: conversationLog,

                })
                .catch((error) => {
                    console.log(`OPENAI ERR: ${error}`);
                });
            if(interaction.options.getString("name"))
            {
                var str = interaction.options.getString("name")
                str = str.charAt(0).toUpperCase() + str.slice(1)
                await interaction.editReply("```yaml\n"  + interaction.user.username + " asked "+ str + ": \n" + interaction.options.getString('msg') + "\n```" + result.data.choices[0].message.content)
            }
            else {

                await interaction.editReply("```yaml\n"  + interaction.user.username + " asked Percy: \n " + interaction.options.getString('msg') + "\n```" + result.data.choices[0].message.content)
            }
            storedConv.push({
                role: 'assistant',
                content: result.data.choices[0].message.content
            })

            let chatlog = JSON.parse(fs.readFileSync('chatlog.json', 'utf8',))
            
            chatlog.push(storedConv)
            fs.writeFileSync('chatlog.json',JSON.stringify(chatlog))
            
        } catch (error) {
            console.log(`ERR: ${error}`);
        }
    },
};


