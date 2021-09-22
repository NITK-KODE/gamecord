const { SlashCommandBuilder } = require('@discordjs/builders');

const userModel = require('../schema/user');
const quickEmbed = require('../helpers/quickEmbed');

async function execute(interaction) {
    try {
        await userModel.create({
            discordId: interaction.user.id,
            regGames: [],
            regPlatforms: [],
            level: 0,
        });
        quickEmbed.success(interaction, "Successfully registered. Next, connect your steam / (valo / etc) account");
    } catch (err) {
        quickEmbed.error(interaction, "Error during registration");
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription("Registering for this service"),
    execute,
};
