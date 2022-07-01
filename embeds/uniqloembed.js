const { MessageEmbed } = require('discord.js');

module.exports = {
    buildProductEmbed(uniqloPRD) {
        const embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle(uniqloPRD.pid)
        .setThumbnail(uniqloPRD.pic[0])
        .setURL(uniqloPRD.url)
        .setTimestamp();
        embed.addField("Is the product live?", `${uniqloPRD.salestatus}`, false);
        embed.addField("Total Stock:", `${uniqloPRD.stockLevel.shift()}`, false);
        for (let i = 0; i < uniqloPRD.sizes.length; i++) {
            embed.addField(`${uniqloPRD.sizes[i]}`, `${uniqloPRD.stockLevel[i]}`, true);
        }
        embed.addField("\u200b", `\u200b`, true);

        return embed;
    },
}