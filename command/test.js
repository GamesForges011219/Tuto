const Discord = require('discord.js')
const config = require("../utils/config");
const axios = require("axios");

module.exports.run = async (client, message, args) => {
    
    const headers = {
        "Authorization": `Bot ODM5NjA1MDM1NTUzNTIxNjg0.YJMFHw.491LpQB2nFDB6zW_SvYmthZDYgg`
    };
    try{

    await axios.post(`https://discord.com/api/v9/channels/${message.channel.id}/messages`,{
        "embed":{
            title:"je suis un boutton",
            description:"Mais tu est qu'elle sorte de boutton ?",
            //color:"RANDOM"
        },
        "components":[
            {
                "type": 1,
                "components": [
                    {
                        "type": 2,
                        "label": "Cliquer sur le boutton de test",
                        "style": 1,
                        "custom_id": "click_one",
                        "emoji": {
                            "name": "🎁"
                        }
                    }
                ]
            }
        ]
        
    }, {headers} );
}catch(e){
    console.log(e)
}
}

module.exports.help = {
    name: "test",
    aliases: ["test"]
}