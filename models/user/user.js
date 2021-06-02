const mongoose = require("mongoose");

module.exports = mongoose.model("user", mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    guildID: { type: String, },
    userID: { type: String, },

    Level: { type: Number, default: 0 },
    Exp: { type: Number, default: 0 },

    Monnaie: { type: Number, default: 0 },

    Sac: { type: Array, default: [] },

    Activer: { type: Boolean, default: false },

}));