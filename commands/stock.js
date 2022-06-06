const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const reqsrc = require('../lib/requestsource.js');
const stkEmbed = require('../embeds/stockembed.js');

module.exports = {
    // Build the slash command
    data: new SlashCommandBuilder()
        .setName('stock')
        .setDescription('Replies with stock info of specified product')
        .addStringOption(option =>
            option.setName('link')
                .setDescription('The link to the product')
                .setRequired(true)),
    async execute(interaction) {
        const linkOption = interaction.options.getString('link');
        // Returns a product object with URL and source code
        const prdSRC = await reqsrc.getSource(linkOption);
        // Checks if the return value is valid text
        if (!prdSRC) {
            await interaction.reply("This was not a valid link!");
        }
        else {
            await prdSRC.parseVariants();
            await prdSRC.parseSubNames();
            // Parse through the file
            const embedSend = stkEmbed.buildProductEmbed(prdSRC);
            await interaction.reply({ embeds: [embedSend] });
        }
    }
}