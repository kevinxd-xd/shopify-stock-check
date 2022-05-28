require('dotenv').config();
const {Client, Intents, Collection} = require('discord.js');
const fs = require('node:fs');


// Create client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Registers all slash commands from commands folder into the Discord API
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = rquire(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

//Indicates bot is read to start
client.once('ready', () => {
    console.log("Bot started");
})

// Checking for events/interactions

client.on('interactionCreate', async interaction => {
    if (interaction.isCommand()) {
        return;
    }

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        return;
    }

    try {
        await command.execute(interaction);
    }
    catch (error) {
        console.log(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }

});

client.login(token);
