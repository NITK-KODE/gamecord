const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios').default;

const userModel = require('../schema/user');
const quickEmbed = require('../helpers/quickEmbed');

// Once we get the current user's profile and get the SteamID64
// Update the DB with the new SteamID64
async function gotProfile(res, interaction) {
    if (res.response.success !== 1) {
        return quickEmbed.error(interaction, "Error retrieving your steam profile. Please check your link");
    }

    let user;
    try {
        user = await userModel.findOne({ discordId: interaction.user.id });
    } catch (err) {
        return quickEmbed.error(interaction, "Error finding your profile");
    }

    if (!user) return quickEmbed.assert(interaction, "Please register first");

    await user.updateOne({ steam: res.response.steamid.toString() });
    return quickEmbed.success(interaction, "Successfully linked to Steam. Next, you can register for a game");
}

async function execute(interaction) {
    // Get the end part of profile link
    let profileURL = interaction.options.getString("profile-url").split('/');
    if (!profileURL[profileURL.length - 1]) profileURL.pop();
    profileURL = profileURL.pop();

    // Check if its already a SteamID64
    if (!Number.isNaN(Number(profileURL))) {
        gotProfile({ response: { success: 1, steamid: profileURL } }, interaction);
    } else {
        // Resolve custom profile URL using Steam Web API
        axios.get("https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/", {
            params: {
                key: process.env.KEY,
                vanityurl: profileURL,
            },
        })
            .then((res) => gotProfile(res.data, interaction))
            .catch((err) => {
                console.error(err);
                quickEmbed.error(interaction, "Error retrieving your steam profile");
            });
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("connect-steam")
        .setDescription("Connect your steam profile to this bot")
        .addStringOption((option) => option.setName("profile-url")
            .setDescription("Link to your steam profile URL")
            .setRequired(true)),
    execute,
};
