const { SlashCommandBuilder } = require('@discordjs/builders');

async function execute(interaction) {
    return interaction.reply('Pong!');
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    execute,
};
