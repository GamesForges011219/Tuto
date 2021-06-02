const Discord = require("discord.js");
const { Setup } = require("../../models/index");
const Canvas = require("canvas");
Canvas.registerFont('./dafont/Maximum_Impact.ttf', { family: 'Maximum Impact' });

module.exports = async (client, member) => {

    let serveur = await Setup.findOne({ guildID: member.guild.id });

    const channel = member.guild.channels.cache.find(ch => ch.id === "839605086609997917");
    if (!channel) return;

    const canvas = Canvas.createCanvas(696, 346);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage(serveur.image_a_bientot.data);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "Arriver_de_" + member.author + ".png");
    channel.send(attachment)
}