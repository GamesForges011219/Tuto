const Discord = require("discord.js");
const { User } = require("../models/index");
const mongoose = require("mongoose");

async function level(message){

        if(message.author.bot) return;
    
        let user = await User.findOne({ guildID: message.guild.id, userID: message.author.id });

        if (!user) {
            user = await new User({
                _id: mongoose.Types.ObjectId(),
                guildID: message.guild.id,
                userID: message.author.id
            }).save()
        }
        var xp_random = ["1", "2", "3", "4"];
        var xp_choix = Math.floor((Math.random() * xp_random.length));
        user.Exp = user.Exp + xp_choix
        var main_level = user.Level;
        var next_level = user.Level * 20
        if (next_level <= user.Exp) {
            user.Exp = 0
            user.Level = main_level + 1
            message.reply(`Bravo ${message.author} vous venez de passer au niveaux ${main_level + 1}`)
        }
        user.save()

}

module.exports = {
    level: level
}