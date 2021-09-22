const { SlashCommandBuilder } = require('@discordjs/builders');

async function execute(interaction) {
    await interaction.reply("Command not implemented !");
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription("A user's profile"),
    execute,
};
