const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

async function execute(interaction) {
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId("buttons.prim")
                .setLabel("PRIMARY")
                .setStyle("PRIMARY"),
            new MessageButton()
                .setCustomId("buttons.second")
                .setLabel("SECONDARY")
                .setStyle("SECONDARY"),
            new MessageButton()
                .setCustomId("buttons.succ")
                .setLabel("SUCCESS")
                .setStyle("SUCCESS"),
            new MessageButton()
                .setCustomId("buttons.danger")
                .setLabel("DANGER")
                .setStyle("DANGER"),
            new MessageButton()
                .setLabel("LINK")
                .setStyle("LINK")
                .setURL("https://github.com/NITK-KODE/gamecord"),
        );

    await interaction.reply({ content: "Buttons testing", components: [row] });
}

async function handleButton(interaction) {
    interaction.update(`Button clicked: ${interaction.customId.split('.')[1]}`);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('buttons')
        .setDescription("Buttons"),
    execute,
    handleButton,
};
