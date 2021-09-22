const { SlashCommandBuilder } = require('@discordjs/builders');
const userModel = require('../schema/user');

async function execute(interaction) {
    try {
        await userModel.create({
            discordID: interaction.user.id,
            regGames: [],
            regPlatforms: [],
            level: 0,
        });
        await interaction.reply("Successfully registered!");
    } catch (err) {
        console.error(err);
        await interaction.reply("Error during registration");
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription("Registering for this service"),
    execute,
};
