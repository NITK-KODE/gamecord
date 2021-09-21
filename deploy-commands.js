// Run this once (or after adding new commands) with `npm run reg-commands`
// This will register usage of slash commands on the server for your bot
// Make sure you have filled out your app id and your bot's token
// server id is already given in .env.sample file

// We only need to register once, not everytime the bot starts
// It takes around 1 hr for the commands to be available to the servers globally if
// we use the other Route

const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

const APPLICATION_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.SERVER_ID;
const { TOKEN } = process.env;

// load commands
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

commandFiles.forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
});

const rest = new REST({ version: '9' }).setToken(TOKEN);

(async () => {
    try {
        await rest.put(
            // use this route for production:
            // Routes.applicationCommands(APPLICATION_ID);
            Routes.applicationGuildCommands(APPLICATION_ID, GUILD_ID),
            { body: commands },
        );

        console.log('Successfully registered application commands.');
    } catch (error) {
        console.error(error);
    }
})();
