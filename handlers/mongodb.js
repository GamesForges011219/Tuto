const mongoose = require("mongoose");
const config = require("../utils/config");

module.exports = async () => {

    if (config.db_username && config.db_password) {
        let mongoURL = `mongodb+srv://${config.db_username}:${config.db_password}@${config.db_author}.mongodb.net/${config.db_name}?retryWrites=true&w=majority`;
        await console.log("Connection du bot à la base de données en cours...");
        await mongoose.connect(mongoURL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        await console.log("Connection à mongoDB Etablie");
        mongoose.connection.on(`connected`, () => console.log(`Mongoose connecté avec succès !`));
        mongoose.connection.on(`disconnected`, () => console.log(`Mongoose déconnecté !`));
        mongoose.connection.on(`err`, err => console.log(`Mongoose erreur de connexion : \n ${err.stack} !`));
    } else if (config.mongoURL) {
        console.log("Connection impossible veuillez vérifier le fichier ./utils/config.js")
    } else {
        console.log("Il doit manquer un nom d'utilisateur ou un mots de passe pour établir la connection");
        return;
    }
}