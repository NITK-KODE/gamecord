// Helper for quickly sending small embeds
const { MessageEmbed } = require('discord.js');

async function error(interaction, msg) {
    return interaction.reply({
        embeds: [new MessageEmbed()
            .setColor("RED")
            .setDescription(msg)],
    });
}

async function success(interaction, msg) {
    return interaction.reply({
        embeds: [new MessageEmbed()
            .setColor("GREEN")
            .setDescription(msg)],
    });
}

async function assert(interaction, msg) {
    return interaction.reply({
        embeds: [new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(msg)],
    });
}

module.exports = { error, success, assert };
