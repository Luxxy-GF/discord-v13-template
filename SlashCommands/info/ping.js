const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "returns websocket ping",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        var ping = Date.now() - interaction.createdTimestamp;
        const embed = new MessageEmbed()
        .setDescription(`Latency: **${ping}**ms \nAPI Latency: **${Math.round(client.ws.ping)}**ms`)
        .setColor(client.config.embedcolor)
        .setFooter(`${interaction.user.tag}`)
        .setTimestamp()
        interaction.followUp({ embeds: [ embed ] });
    },
};