const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const axios = require('axios');
// const Steam = require('steam');
// const CSGO = require('csgo');

// const csgoModel = require('../schema/csgo');
const userModel = require('../schema/user');
const quickEmbed = require('../helpers/quickEmbed');

// const steamClient = new Steam.SteamClient();
// const steamUser = new Steam.SteamUser(steamClient);
// const steamGC = new Steam.SteamGameCoordinator(steamClient, 730);
// const csgo = new CSGO.CSGOClient(steamUser, steamGC, false);

// steamClient.connect();
// steamClient.on('connected', () => {
//     console.log("Steam connected");
//     steamUser.logOn({
//         account_name: process.env.STEAM_USER,
//         password: process.env.STEAM_PASS,
//     });
// });
// steamClient.on('logOnResponse', () => {
//     console.log("Steam logged on");
//     csgo.launch();
// });

// function to handle player stats request
async function playerStats(interaction, steamId) {
    await interaction.deferUpdate();

    // Use the steam web API for user stats for game with game id 730 (CSGO)
    axios.get('https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/', {
        params: {
            key: process.env.KEY,
            appid: 730,
            steamid: steamId,
        },
    })
        .then((res) => {
            // parse stats to make it more accessible
            // we also get the achievemetns data from the API - may use later
            const stats = {};
            res.data.playerstats.stats.forEach((e) => {
                stats[e.name] = e.value;
            });

            const ebd = new MessageEmbed()
                .setTitle('Player Stats')
                .setColor("GOLD")
                .addField('Total Kills', stats.total_kills.toString())
                .addField('Total Deaths', stats.total_deaths.toString())
                .addField('Overall K/D', (stats.total_kills / stats.total_deaths).toString())
                .addField('Total Knife Kills', stats.total_kills_knife.toString())
                .addField('Total Planted Bombs', stats.total_planted_bombs.toString())
                .addField('Total Defused Bombs', stats.total_defused_bombs.toString());

            return interaction.editReply({ content: "Here's your request", components: [], embeds: [ebd] });
        })
        .catch((err) => {
            console.error(err);
            return interaction.editReply({ content: "An error occured", components: [] });
        });
}

// funciton to display the most recently played match scoreboard
async function lastMatch(interaction, steamId) {
    await interaction.deferUpdate();
    console.log(steamId);
    interaction.editReply({ content: "Not yet implemented", components: [] });
}

async function execute(interaction) {
    // find the user if registered
    let user;
    try {
        user = await userModel.findOne({ discordId: interaction.user.id });
        if (!user) return quickEmbed.assert(interaction, "You have not registered");
    } catch (err) {
        return quickEmbed.error(interaction, "An error occured");
    }

    const steamid = user.get('steam');
    if (!steamid) return quickEmbed.assert(interaction, "You have not linked steam");

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`csgo.match.${steamid}`)
                .setLabel('Last Match')
                .setStyle('PRIMARY'),
            new MessageButton()
                .setCustomId(`csgo.lifestats.${steamid}`)
                .setLabel('Player Stats')
                .setStyle('PRIMARY'),
        );
    return interaction.reply({ content: "Choose an option below: ", components: [row] });
}

async function handleButton(interaction) {
    const [, button, steamid] = interaction.customId.split('.');
    switch (button) {
        case 'lifestats':
            playerStats(interaction, steamid);
            break;
        case 'match':
            lastMatch(interaction, steamid);
            break;
        default:
            await interaction.update({ content: "An error occured ", components: [] });
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('csgo')
        .setDescription("CS:GO related stuff"),
    execute,
    handleButton,
};
