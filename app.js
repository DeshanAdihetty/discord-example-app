const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const cron = require('cron');
let count = 1
const client = new Client({ intents: [	GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences] });
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}

client.once(Events.ClientReady, () => {
  client.user.setActivity("with our hearts", {

  });
  console.log('Ready!');
 // blunt()


  let bluntJob = new cron.CronJob('00 20 4,16 * * *', ()=> {

    blunt().then(()=>{})
    fs.writeFileSync('chatlog.json',JSON.stringify([]))
  },{
    scheduled: true,
    timezone: "Australia/Melbourne"
  });
  bluntJob.start()

});




async function  blunt() {
  const guild = await client.guilds.cache.get('922736141936001074');
  const role =  await guild.roles.cache.find(r => r.name === "Joint")
  let newMembers = []
  guild.members.fetch().then(async m => {
    m.map(u => {

          newMembers.push(u)


        }
    )
    const shuffledArray = newMembers.sort((a, b) => 0.5 - Math.random());

    user = shuffledArray.pop()
    if (user === undefined) {
      user = shuffledArray.pop()
    }

    newMembers.forEach(m => {
      if (m.roles.cache.some(role => role.name === 'Joint')) {
        console.log(m.user.username + "=>"+ user.user.username)

        if (m.user.username === user.user.username) {

          count += 1

        } else {
          count = 1
        }
        m.roles.remove(role)
        user.roles.add(role)

      }
    })


  })
  if(count>1) {
    console.log(count)

    client.channels.cache.get('1104006153685450762').send(user.nickname + " has had the blunt "+ count + " times in a row");
  }

}
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction,client);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
    } else {
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
});

client.login(token);
