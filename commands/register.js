const { SlashCommandBuilder } = require('@discordjs/builders');

const userModel = require('../schema/user');
const quickEmbed = require('../helpers/quickEmbed');

// Only register the user, no replying
async function justRegister(userid) {
    try {
        await userModel.create({
            discordId: userid,
            regGames: [],
            regPlatforms: [],
            level: 0,
        });
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

// Register user to discord with reply
async function execute(interaction) {
    const result = await justRegister(interaction.user.id);
    if (result === true) {
        quickEmbed.success(interaction, "Successfully registered. Next, connect your steam / (valo / etc) account");
    } else {
        quickEmbed.error(interaction, "Error during registration");
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription("Registering for this service"),
    execute,
    justRegister,
};
