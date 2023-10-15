const { SlashCommandBuilder } = require('discord.js');
const fs = require("fs");
const {pipe} = require("stream");
const https = require('https');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Updates all the new cat pics onto the lab.'),
    async execute(interaction, client) {
    await interaction.deferReply({ ephemeral: true });
    const guild = client.guilds.cache.get(interaction.guildId)
    var id
    let messages = [];
        guild.channels.fetch().then(async m => {
            m.map(u => {
                    if(u.name == "cat-pics-for-percy"){
                        id = u.id
                    }

                }
               
            )
            let channel = client.channels.cache.get(id)
            let message = await channel.messages
            .fetch({ limit: 1 })
            .then(messagePage => (messagePage.size === 1 ? messagePage.at(0) : null));
        
          while (message) {
            await channel.messages
              .fetch({ limit: 100, before: message.id })
              .then(messagePage => {
                messagePage.forEach(msg =>{
                    
                      
                        msg.attachments.map((e)=> {if(typeof e !=null){
                        
                        messages.push(e)}})

                        
                    
                });
        
                // Update our message pointer to be the last message on the page of messages
                message = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
              });
          }
        
          ;  // Print all messages
          data = (messages.map((e)=>{
            return e.url
          }))
          fs.writeFile('percys-lab/catpics.json',JSON.stringify(data), ((err)=>{
            console.log(err)
            if(err == null){
              interaction.editReply({content: "Updated cat pics",ephemeral: true})
            }
        }))
        interaction.editReply({content: "Something went wrong, tell desh",ephemeral: true})


        })
        }











};