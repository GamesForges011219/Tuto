const fs = require("fs");

module.exports = (client) => {

    const Fichier_Command = fs.readdirSync('./command/').filter(file => file.endsWith(".js"));

    for(const file of Fichier_Command){
        const command = require(`../command/${file}`);
        console.log(`${file} chargée!`);
        client.commands.set(command.help.name, command);
    }

    const Fichier_Admin = fs.readdirSync('./admin/').filter(file => file.endsWith(".js"));

    for(const file of Fichier_Admin){
        const command_Admin = require(`../admin/${file}`);
        console.log(`${file} chargée`);
        client.commands.set(command_Admin.help.name, command_Admin);
    }
    
}