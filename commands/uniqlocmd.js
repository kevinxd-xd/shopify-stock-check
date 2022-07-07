const { SlashCommandBuilder } = require('@discordjs/builders');
const uniqloEmbed = require('../embeds/uniqloembed.js');
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
        const apiLink = process.env.STORES_API + "/api/uniqlo?pid=" + interaction.options.getString('pid');
        await interaction.deferReply();
        try {
            const prdSRC = await fetch(apiLink);
            if (prdSRC.status != 200) {
                await interaction.editReply(`Response Status Code: ${prdSRC.status}\nA bad request was made!`);
            }
            else {
                const jsonconvert = await prdSRC.json();
                const embedSend = uniqloEmbed.buildProductEmbed(jsonconvert);
                await interaction.editReply({ embeds: [embedSend] });
            }
        }
        catch (error) {
            console.error(error);
            await interaction.editReply("An error occured while processing your request");
        }
    }
}