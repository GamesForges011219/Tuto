const Discord = require("discord.js");
const Canvas = require("canvas");
Canvas.registerFont('./dafont/impact.ttf', { family: 'Impact' });
Canvas.registerFont('./dafont/Maximum_Impact.ttf', { family: 'Maximum Impact' });
const { User } = require("../models/index");

module.exports.run = async (client, message, args) => {

    if(!args[0]){
        var member = message.author;
    }else{
        var member = message.mentions.users.first() || client.users.cache.get(args[0]); 
    }

    let user = await User.findOne({ guildID: message.guild.id, userID: member.id })

    const canvas = Canvas.createCanvas(946, 286);
    const ctx = canvas.getContext('2d');

    const XP = user.Exp;
    const MAX_XP = (user.Level*20);
    const POURCENTAGE = Math.ceil(XP*100/MAX_XP)

    bar(ctx, 268/*Longueur gauche en X*/, 184/*Hauteur Y*/, 590/*Longueur Barre*/, 38/*Hauteur Barre*/, 2/*Arrondi*/, 'rgba(38, 203, 186, 0.2)'/*Couleur 0.2 Opacité*/);
    bar(ctx, 268, 184, 590*POURCENTAGE/100, 38, 2, 'rgba(38, 203, 186, 1)');

    const background = await Canvas.loadImage("./image/user2.png");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.font = '50px Maximum Impact';
    ctx.textAlign = "end"
    ctx.fillStyle = '#FFFFFF';
    var Level =  "Level "+user.Level
    ctx.fillText(Level, 870, 105)

    ctx.font = '40px Maximum Impact';
    ctx.textAlign = "left"
    ctx.fillStyle = '#FFFFFF';
    var membre = client.users.cache.get(member.id);
    var UserTag =  membre.username.length > 12 ? membre.username.substring(0, 12)+`#${member.discriminator}` + '': membre.username + `#${member.discriminator}`
    ctx.fillText(UserTag, 260, 170)

    ctx.font = '33px Maximum Impact';
    ctx.textAlign = "end"
    ctx.fillStyle = '#FFFFFF';
    var Exp =  "Xp "+user.Exp+"/"+(user.Level*20)
    ctx.fillText(Exp, 870, 177)

    ctx.font = '27px Maximum Impact';
    ctx.textAlign = "end"
    ctx.fillStyle = '#FFFFFF';
    var Exp =  "Xp "+POURCENTAGE+"%"
    ctx.fillText(Exp, 595, 211)

    //comment calculer la taille de notre image
    //on prend la taille de la pp (photo de profil) on la multiplie par 2 
    //exemple:
    /*
    pp = 16*2 = 32, 32*2 = 64, 64*2 = 128 

    */
	const avatar = await Canvas.loadImage(member.displayAvatarURL({ format: 'jpg', size: 128 })); //on charge l'image taille 128 par 128
    const avatarCanvas = Canvas.createCanvas(128, 128, {format: "png"}); //on créer un nouvaux Canvas Pour la pp
    const avatarCTX = avatarCanvas.getContext('2d'); //on fais un context en 2d
    rounded(avatarCTX, 0, 0, 128, 128, 20); //on créer la zone ou sera afficher la pp (pp == photo de profil )
    avatarCTX.clip(); //on coupe la zone
    avatarCTX.drawImage(avatar, 0, 0, 128, 128) //on colle la pp dans la zone 
	ctx.drawImage(avatarCanvas, 92, 79); //on colle la photo après le découpage dans l'image principale


    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "level_de_"+member.tag+".png");
    message.channel.send(attachment);

}

module.exports.help = {
    name:"level"
}

async function rounded(ctx, x, y, width, height, radius) {
    ctx.beginPath(); //début d'une modification 
    ctx.moveTo(x, y+height-radius); //en bas à gauche après arrondi
    ctx.lineTo(x, y+radius) //dans l'angle en haut à gauche avant l'arrondi 
    ctx.quadraticCurveTo(x, y, x+radius, y); // on construit l'arrondi
    ctx.lineTo(x+width-radius, y); //on on ce mets en haut à droit avant l'arrondi
    ctx.quadraticCurveTo(x+width, y, x+width, y+radius); //on construit l'arrondi
    ctx.lineTo(x+width, y+height-radius) //on vas en bas à droite avant l'arrondi
    ctx.quadraticCurveTo(x+width, y+height, x+width-radius, y+height); //on construit l'arrondi
    ctx.lineTo(x+radius, y+height) //on vas en bas à gauche avant l'arrondi 
    ctx.quadraticCurveTo(x, y+height, x, y+height-radius) //on cronstruit l'arrondi
    ctx.closePath(); //on retire c'est modifications 
}

async function bar(ctx, x, y, w, h, radius, color){
    
    ctx.save(); //on save le context
    rounded(ctx, x, y, w, h, radius); //on défini la function rounded
    ctx.clip(); //la on le coupe
    ctx.fillStyle = color; //on définie la couleur
    ctx.fillRect(x, y, w, h); //on défini la taille (rectangle)
    ctx.restore(); //on charge le save, return;

}

//Merci à Lulu qui ce reconnaitra