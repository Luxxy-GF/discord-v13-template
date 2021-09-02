const { Client, Collection, MessageEmbed } = require("discord.js");

const client = new Client({
    presence: {
        status: 'idle',
        afk: true,
        activities: [{
            name: 'Discord.js v13',
            type: 'PLAYING',
        }],
    },
    intents: 32767,
});
module.exports = client;

// Global Variables
const fs = require("fs");
client.categories = fs.readdirSync("./commands/");
client.aliases = new Collection();
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

// Initializing the project
require("./handler")(client);
const mongo = require('./handler/mongoose');
mongo.init();

client.login(client.config.token);
