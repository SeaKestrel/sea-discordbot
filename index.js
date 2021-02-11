let { Client } = require("discord.js")
let ytdl = require("ytdl-core")
let bot = new Client()

let playin = []
bot.guilds.cache.forEach((guild, key, map) => {
    playin[guild.id] = false;
})
let sound = undefined;
let loop = false;

bot.on("ready", () => {
    let a = 0;
    bot.user.setActivity({name: " the Sea", type: "LISTENING"})
    setInterval(() =>{
        if(a === 0) {
            bot.user.setActivity({name: " the Sea", type: "LISTENING"})
            a = 1
        } else if(a === 1){
            bot.user.setActivity({name: "the pleasure of everyone", type: "COMPETING"})
            a = 0
        }
    }, 20000)
    console.log("La mer se déchaîne!")
})

bot.on("message", msg => {
    if(msg.content.startsWith("/play")){
        if(!msg.member.voice.channel){
            msg.reply("Pas p'ssible ça nanan")
        }else {
            if(msg.content.split(" ")[1] === undefined) return msg.reply("Je veux bien te jouer un p'tit truc mais je veux bien savoir quoi :joy:\nTu as à ta disposition:\n- sea\n- storm\n- forest\n- url <lien>\nallez là!")
            if(!bot.voice.connections.has(msg.guild.id) || !bot.voice) msg.channel.send("Attends, j'arrive d'ici peu...")
            setTimeout(() =>{
                msg.member.voice.channel.join().then(connection => {
                    msg.channel.send("Me voilà! Je cherche ton son...")
                    console.log("Création de connexion sur "+msg.guild.name)
                    let url;
                    if(msg.content.split(" ")[1] === "sea"){
                        url = "https://www.youtube.com/watch?v=WHPEKLQID4U";
                        sound = "sea"
                    } else if(msg.content.split(" ")[1] === "storm"){
                        url = "https://www.youtube.com/watch?v=ekXFslHOvZ8";
                        sound = "storm"
                    } else if(msg.content.split(" ")[1] === "url"){
                        if(msg.content.split(" ")[2] === undefined) return msg.reply("Je veux bien un lien steplé")
                        url = msg.content.split(" ")[2]; 
                        if(!url.startsWith("https")) return msg.reply("C'est po un line ço")
                    } else if(msg.content.split(" ")[1] === "forest"){
                        url = "https://www.youtube.com/watch?v=OdIJ2x3nxzQ"
                        sound = "forest"
                    }else {
                        return msg.reply("Ça existe pas andouille!\nc'est \n- sea\n- storm\n- forest\n- url <lien>")
                    }
                    console.log("Choix du son "+sound+" sur le serveur "+msg.guild.name)
                    let dispatcher = connection.play(ytdl(url, {filter: 'audioonly'}));
                    playin[msg.guild.id] = true;
                    dispatcher.setVolume(1)
                    dispatcher.on("start", () => {
                        if(msg.content.split(" ")[1] === "url"){
                            msg.channel.send("J'ai démarré un son, j'sais po c'est qwo, mais si t'aimes ben tant mieux :joy::joy:")
                        } else {
                            msg.channel.send("Voilà, j't'ai démarré le son "+sound)
                        }
                    })
                    dispatcher.on("end", () => {
                        connection.disconnect()
                        playin[msg.guild.id] = false
                    })
                })
            },1000)
        }
    } else if(msg.content === "/stop") {
        if(playin[msg.guild.id] === true && msg.member.voice.channel){
            if(bot.voice.connections.has(msg.guild.id)) {
                bot.voice.connections.get(msg.guild.id).disconnect()
                msg.reply("Voilà, c'est bon, j'arrête")
            } else {
                msg.channel.send("Bam dans ta gueule")
            }
        } else {
            msg.reply("I CANT")
        }
    } else if(msg.content === "/loop"){
        if(loop){
            loop = false
            msg.channel.send("Mode LOUPE :repeat: désactivé!")
        } else {
            loop = true
            msg.channel.send("Mode LOUPE :repeat: activé!")
        }
    } else if(msg.content === "/delbot"){
        if(msg.author.id === "295316854044622849"){
            bot.destroy()
            process.exit(0);
        }
    }
})

bot.login(process.env.TOKEN)