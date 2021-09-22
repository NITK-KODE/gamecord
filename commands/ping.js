const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

async function execute(interaction) {
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('ping.primary')
                .setLabel('Again')
                .setStyle('PRIMARY'),
        );
    await interaction.reply({ content: 'Pong!', components: [row] });
}

async function handleButton(interaction) {
    await interaction.update({ content: 'Don\'t ping me again!', components: [] });
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    execute,
    handleButton,
};
