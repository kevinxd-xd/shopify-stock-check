const { SlashCommandBuilder } = require('@discordjs/builders');
const stkEmbed = require('../embeds/stockembed.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config();

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
        const apiLink = process.env.STORES_API + encodeURIComponent(interaction.options.getString('link'));
        try {
            const prdSRC = await fetch(apiLink);
            if (!prdSRC) {
                await interaction.reply("An error occured while processing your request");
            }
            else {
                const embedSend = stkEmbed.buildProductEmbed(await prdSRC.json());
                await interaction.reply({ embeds: [embedSend] });
            }
        }
        catch (error) {
            await interaction.reply("An error occured while processing your request");
        }
    }
}