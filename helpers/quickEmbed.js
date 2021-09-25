// Helper for quickly sending small embeds
// this uses reply to send embeds
// so you can't use it to update, only to send reply first time (not even deferred)
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

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

async function link(interaction, msg, url) {
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setLabel("Link")
                .setStyle("LINK")
                .setURL(url),
        );
    return interaction.reply({
        embeds: [new MessageEmbed()
            .setColor("LIGHT_GREY")
            .setDescription(msg)],
        components: [row],
    });
}

module.exports = {
    error,
    success,
    assert,
    link,
};
