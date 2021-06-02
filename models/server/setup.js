const mongoose = require("mongoose");

module.exports = mongoose.model("setup", new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: { type: String},
    Prefix: { type: String, default: "/"},

    bienvenue: { type: String, default: "Vide" },
    A_Bientot: { type: String, default: "Vide" },
    logs: { type: String, default: "Vide" },

    image_bienvenue: { data: Buffer, contentType: String },
    image_a_bientot: { data: Buffer, contentType: String },

    param_bienvenue: { type: String, default: "image" },
    param_a_bientot: { type: String, default: "embed" },  
}));