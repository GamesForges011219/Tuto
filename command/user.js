const { User } = require("../models/index");
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if(!args[0]){
        var user = message.author;
    }else{
        var user = message.mentions.users.first() || client.users.cache.get(args[0]);
    };

    let membre = await User.findOne({ guildID: message.guild.id, userID: user.id });

    let userEmbed = new Discord.MessageEmbed()
    .setTitle("Voici toutes les informations")
    .setAuthor("Informations de "+user.tag)
    .setColor("RANDOM")
    .setTimestamp()
    .setDescription(`**__Level__**: ${membre.Level}\n`
    +`**__Exp__**: ${membre.Exp}\n`
    +`**__Monnaie__**: ${membre.Monnaie}€ \n`
    +" \n"
    +`${membre.Sac.map( s => `${s}`).join(" \n") || `${user} Vous ne possédez rien dans votre Sac`}`)
    message.channel.send(userEmbed)

}

module.exports.help = {
    name:"user"
}