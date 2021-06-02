const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    let member = message.mentions.users.first() || message.author

    let avatar = member.displayAvatarURL({size: 1024})


    const embed = new Discord.MessageEmbed()
    .setTitle("Voici l'avatar de `"+`${member.username}`+"`")
    .setImage(avatar)
    .setColor("RANDOM")
    message.channel.send(embed);

}

module.exports.help = {
    name:"avatar"
}