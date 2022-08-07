const { SlashCommandBuilder } = require('@discordjs/builders');
const stkEmbed = require('../embeds/shopifyembed.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config();

module.exports = {
    // Build the slash command
    data: new SlashCommandBuilder()
        .setName('shopify')
        .setDescription('Replies with stock info of specified shopify product')
        .addStringOption(option =>
            option.setName('link')
                .setDescription('The link to the product')
                .setRequired(true)),
    async execute(interaction) {
        const apiLink = process.env.STORES_API + "/api/shopify?url=" + encodeURIComponent(interaction.options.getString('link'));
        try {
            const prdSRC = await fetch(apiLink);
            if (prdSRC.status != 200) {
                await interaction.reply(`Response Status Code: ${prdSRC.status}\nA bad request was made!`);
            }
            else {
                const embedSend = stkEmbed.buildProductEmbed(await prdSRC.json());
                await interaction.reply({ embeds: [embedSend] });
            }
        }
        catch (error) {
            console.error(error.stack);
            await interaction.reply("An error occured while processing your request");
        }
    }
}