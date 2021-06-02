const Discord = require("discord.js");
const { Setup } = require("../models/index");

module.exports.run = async (client, message, args) => {

    let serveur = await Setup.findOne({ guildID: message.guild.id });

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.sendmessage.channel.send({embed: {
        color: '#0ff3e2',
        description:`${member} Cette commande require le droit d'administrateur`
    }});
    
    if(!args[0]) return message.channel.send({
        embed:{
            color:"#FF0B14",
            description:`${message.author} Veuillez définir le prefix`
        }
    })

    serveur.Prefix = args[0];

    serveur.save()
    message.channel.send({
        embed:{
            color:"#0FFB14",
            description:`${message.author} Voici le nouveau prefix du bot **${serveur.Prefix}**`
        }
    })

}

module.exports.help = {
    name:"set-prefix",
    aliases:["setprefix"]
}