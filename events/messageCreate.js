const client = require("../index");
const prefixSchema = require("../models/prefix");
const prefix = (client.config.prefix);

client.on("messageCreate", async (message) => {

    client.prefix = async function (message) {
        let custom;
      
        const data = await prefixSchema
          .findOne({ Guild: message.guild.id })
          .catch((err) => console.log(err));
      
        if (data) {
          custom = data.Prefix;
        } else {
          custom = prefix;
        }
        return custom;
    };
    const p = await client.prefix(message);

    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(p)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(p.length)
        .trim()
        .split(" ");

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    await command.run(client, message, args);
});