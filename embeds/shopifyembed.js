const { MessageEmbed } = require('discord.js');

module.exports = {
    buildProductEmbed(prd) {
        const embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle(prd.prodName)
        .setThumbnail(prd.pic);
        for (let i = 0; i < prd.subnames.length; i++) {
            const link = prd.URL + "?variant=" + prd.vars[i];
            embed.addField(`${prd.subnames[i].trim()}`, `Stock Levels: [?]\n [[ATC]](${link})`, true);
        }
        return embed;
    },
}