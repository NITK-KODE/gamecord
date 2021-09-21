// Requrie stuff
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
require('dotenv').config();

// Tokesn and URLs and other constants
const { TOKEN } = process.env;

// Create discord client
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Load all commands in the commands folder
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

commandFiles.forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
});

client.once('ready', () => {
    console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(TOKEN);
