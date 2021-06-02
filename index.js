const { default: axios } = require("axios");
const Discord = require("discord.js");
const client = new Discord.Client();
const { token } = require("./utils/config");
client.login(token);
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

//Handler
['command_handlers', 'event_handlers', 'mongodb'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
    console.log(handler + " Chargée avec succèes")
});

client.on("raw", async event => {
    if(event.t === "INTERACTION_CREATE"){
        const interaction = event.d
        await axios.post(`https://discord.com/api/v8/interactions/${interaction.id}/${interaction.token}/callback`, {type: 7, data: {components:[]}})
        const msg = await client.guilds.cache.get(interaction.guild_id).channels.cache.get(interaction.channel_id).messages.fetch(interaction.message.id);
        msg.edit(new Discord.MessageEmbed().setDescription("je me suis modifié ^^"))
    }
})