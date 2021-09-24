const { SlashCommandBuilder } = require('@discordjs/builders');
const quickEmbed = require('../helpers/quickEmbed');
const csgoModel = require('../schema/csgo');
const userModel = require('../schema/user');

async function execute(interaction) {
    let user;
    try {
        user = await userModel.findOne({ discordId: interaction.user.id });
    } catch (err) {
        return quickEmbed.error(interaction, "Error finding your profile");
    }

    const steamId = user.get('steam');

    if (!user || !steamId) return quickEmbed.error('Please register first');

    const authCode = interaction.options.getString('authentication-code');
    const lastMatchCode = interaction.options.getString('last-match-code');

    if (!authCode) return quickEmbed.error(interaction, "You need to enter your authentication code found at ");
    if (!lastMatchCode) return quickEmbed.error(interaction, "You need to enter your most recently completed match token found at ");

    await csgoModel.updateOne({ steamId }, { authCode, lastMatchCode }, { upsert: true });

    return quickEmbed.success(interaction, "Successfully added CS:GO. You can now query game stats and more");
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-csgo')
        .setDescription("Link CS:GO game to be able to access all its features")
        .addStringOption((option) => option.setName('authentication-code')
            .setDescription("Your Match History Authentication code"))
        .addStringOption((option) => option.setName('last-match-code')
            .setDescription("Your most recently completed match token / code")),
    execute,
};
