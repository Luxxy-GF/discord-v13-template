const prefixSchema = require("../../models/prefix");
const { Message, MessageEmbed, Permissions } = require("discord.js");
module.exports = {
  
  name: "prefix",
  category: "settings",
  description: "Changes the bot prefix.",
  usage: "<prefix>",
  aliases: ["setprefix", "set-prefix"],

  run: async (client, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return message.channel.send("you can not use this command due to perms")
    const res = await args.join(" ");
    if (!res)
      return message.channel.send("Please specify a prefix to change to.");
    prefixSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (err) throw err;
      if (data) {
        data.delete();
        data = new prefixSchema({
          Guild: message.guild.id,
          Prefix: res,
        });
        data.save();
        message.channel.send(`Server prefix has been updated to \`${res}\``)
      } else {
        data = new prefixSchema({
          Guild: message.guild.id,
          Prefix: res,
        });
        data.save();
        message.channel.send(`Custom prefix in this server is now set to \`${res}\``);
      }
    });
  },
};
