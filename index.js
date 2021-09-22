// Requrie stuff
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
require('dotenv').config();

const mongoose = require('mongoose');

// Tokesn and URLs and other constants
const { TOKEN, DB_URL } = process.env;

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
    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    } else if (interaction.isButton()) {
        const command = client.commands.get(interaction.customId.split('.')[0]);

        try {
            await command.handleButton(interaction);
        } catch (error) {
            console.error(error);
            await interaction.update({ content: 'There was an error while executing this command', components: [] });
        }
    }
});

mongoose.connect(DB_URL, () => {
    console.log("Mongoose connected");
    client.login(TOKEN);
});
