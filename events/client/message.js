const mongoose = require("mongoose");
const { Setup, User } = require("../../models/index");
const { level } = require("../../function/Level");

module.exports = async (client, message, args) => {

    //ici on appel notre shema ce qui nous permettra de vérifié si celui si et dans la bdd
    var setup = await Setup.findOne({ guildID: message.guild.id });

    if (!setup) { //si le schema n'existe pas alors il le créer

        setup = await new Setup({
            _id: mongoose.Types.ObjectId(),
            guildID: message.guild.id,
            image_bienvenue: { data: null, contentType: "image/png" },
            image_a_bientot: { data: null, contentType: "image/png" },
        }).save()

    }

    level(message)

    const prefiX = setup === null ? '.' : setup.Prefix

    if (message.author.bot) return;
    if (!message.content.startsWith(prefiX)) return;
    var messageArray = message.content.split(" ");
    var command = messageArray[0].toLowerCase();
    var args = messageArray.slice(1);
    var commandFile =
        client.commands.get(command.slice(prefiX.length)) ||
        client.commands.find(
            (cmd) =>
                cmd.help.aliases &&
                cmd.help.aliases.includes(command.slice(prefiX.length))
        );
    if (commandFile) commandFile.run(client, message, args);

}