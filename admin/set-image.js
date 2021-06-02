const Discord = require("discord.js");
const { Setup } = require("../models/index");
const bent = require("bent");

module.exports.run = async (client, message, args) => {

    let serveur = await Setup.findOne({ guildID: message.guild.id });

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.sendmessage.channel.send({embed: {
        color: '#0ff3e2',
        description:`${member} Cette commande require le droit d'administrateur`
    }});

    if(!args[0]) return message.channel.send({
        embed:{
            color:"#FF0B14",
            description: `${message.author} Veuillez définir l'une des catégorie\n`
            +" \n"
            +'`'+serveur.Prefix+"set-image <arriver|depart> <envoyez_votre_image>`\n"
        }
    });

    let arriver = [
        "arriver",
        "Arriver",
        "arrivé",
        "Arrivé"
    ]
    if(arriver.includes(args[0])){

        let url = message.attachments.first()?.url
        if(url == null) return message.channel.send({
            embed:{
                color:"#FF0B14",
                description: `${message.author} Url invalide`
            }
        });

        let imageData = await bent("buffer")(url);

        try{
        serveur.image_bienvenue = ({ contentType: "image/png", data: imageData});
        serveur.save()
        message.delete({ timeout: 5000});

        let attachment = new Discord.MessageAttachment(serveur.image_bienvenue.data, 'unknown.png');

        message.channel.send({files: [attachment],
            embed:{
                color:"#0FFB14",
                description: `${message.author} Image d'arriver enregistré avec succées`,
                image: {
                    url: "attachment://unknown.png",
                },
            }
        })
        }catch(err){
        message.channel.send({
            embed:{
                color:"#FF0B14",
                description: `${message.author} Désolé une erreur est survenue`
            }
        })
        }
    }

    let depart = [
        "depart",
        "Depart",
        "départ",
        "Départ"
    ]
    if(depart.includes(args[0])){
        let url = message.attachments.first()?.url
        if(url == null) return message.channel.send({
            embed:{
                color:"#FF0B14",
                description: `${message.author} Url invalide`
            }
        });

        let imageData = await bent("buffer")(url);

        try{
        serveur.image_a_bientot = ({ contentType: "image/png", data: imageData});
        serveur.save()
        message.delete({ timeout: 5000});

        let attachment = new Discord.MessageAttachment(serveur.image_a_bientot.data, 'unknown.png');

        message.channel.send({files: [attachment],
            embed:{
                color:"#0FFB14",
                description: `${message.author} Image de départ enregistré avec succées`,
                image: {
                    url: "attachment://unknown.png",
                },
            }
        })
        }catch(err){
        message.channel.send({
            embed:{
                color:"#FF0B14",
                description: `${message.author} Désolé une erreur est survenue`
            }
        })
        }
    }

}   

module.exports.help = {
    name:"set-image",
    aliases:["setimage"]
}