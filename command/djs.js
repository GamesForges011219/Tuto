const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, message, args) => {
    let arg = args.join(" ");

    if(!arg) return message.channel.send({
        embed:{
            color:"#FF0B14",
            description:`${message.author} Veuillez spécifier une valeur pour votre recherche`
        }
    })
    fetch(`https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(arg)}`)
    .then( r => r.json())
    .then( d => {
        message.channel.send({ embed: d })
    });

}

module.exports.help = {
    name:"djs"
}