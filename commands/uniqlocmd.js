const { SlashCommandBuilder } = require('@discordjs/builders');
const stkEmbed = require('../embeds/shopifyembed.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config();

module.exports = {
    // Build the slash command
    data: new SlashCommandBuilder()
        .setName('uniqlo')
        .setDescription('Replies with stock info of specified uniqlo product')
        .addStringOption(option =>
            option.setName('pid')
                .setDescription('The PID to the product')
                .setRequired(true)),
    async execute(interaction) {
        if (interaction.options.getString('pid').includes("uniqlo") || interaction.options.getString('pid').includes("https") ) {
            await interaction.reply("Please enter the PID of the product, not a link!");
            return;
        }
        const apiLink = process.env.STORES_API + "uniqlo?pid=" + interaction.options.getString('pid');
        try {
            const prdSRC = await fetch(apiLink);
            if (!prdSRC) {
                await interaction.reply("An error occured while processing your request");
            }
            else {
                console.log(await prdSRC.json());
                await interaction.reply("Success!");
            }
        }
        catch (error) {
            await interaction.reply("An error occured while processing your request");
        }
    }
}