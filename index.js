let { Client } = require("discord.js")
let ytdl = require("ytdl-core")
let bot = new Client()

let playin = false;
let sound = undefined;

bot.on("ready", () => {
    console.log("La mer se déchaîne!")
})

bot.on("message", msg => {
    if(msg.content.startsWith("/play")){
        if(!msg.member.voice.channel){
            msg.reply("Pas p'ssible ça nanan")
        }else {
            if(msg.content.split(" ")[1] === undefined) return msg.reply("Je veux bien te jouer un p'tit truc mais je veux bien savoir quoi :joy:\nTu as à ta disposition:\n-sea\n-storm\nallez là!")
            if(!bot.voice.connections.has(msg.guild.id)) msg.reply("Attends, j'arrive d'ici peu...")
            setTimeout(() =>{
                msg.member.voice.channel.join().then(connection => {
                    msg.reply("Me voilà! Je cherche ton son d'ambiance...")
                    let url;
                    switch(msg.content.split(" ")[1]){
                        case "sea":
                            url = "https://www.youtube.com/watch?v=WHPEKLQID4U";
                            sound = "sea"
                        break;
                        case "storm":
                            url = "https://www.youtube.com/watch?v=ekXFslHOvZ8";
                            sound = "storm"
                        break;
                        default:
                            return msg.reply("Ça existe pas andouille!\nc'est soit *sea* soit *storm*!")
                    }
                    let dispatcher = connection.play(ytdl(url, {filter: "audioonly"}));
                    playin = true;
                    dispatcher.setVolume(1)
                    dispatcher.on("end", () => {
                        connection.disconnect()
                        playin = false
                    })
                })
            },5000)
        }
    } else if(msg.content === "/stop") {
        if(playin === true && msg.member.voice.channel){
            if(bot.voice.connections.has(msg.guild.id)) {
                bot.voice.connections.get(msg.guild.id).disconnect()
                msg.reply("Voilà, c'est bon, j'arrête")
            }
        }
    }
})

/*bot.on("voiceStateUpdate", (state1, state2) => {
    if(state2.channel !== null && state2.channel.name === "sea"){
        try{
            if(state2.id === "809005379073605632") return
            let member = state2.guild.members.cache.get(state2.id)
            member.voice.setMute(true, "S'il il se relaxe, il a pas besoin de parler.")
        }catch (err) {
            console.log("Erreur")
        } 
        return
    } else if(state2.channel !== null && state2.channel.name !== "sea") {
        try{
            let member = state2.guild.members.cache.get(state2.id)
            if(state2.channelID === null) return;
            if(member.voice !== null && member.voice.serverMute === true) member.voice.setMute(false, "C'est bon, plus besoin de le faire taire LOL.")
        }catch (err) {
            console.log("Erreur")
        } 
        return
    } else{
        return
    }
})

bot.on("error", err =>{
    bot.users.cache.get("295316854044622849").createDM().then(c => {
        c.send("Y'a une erreur je crois...\n"+err.name+": "+err.message)
    })
})*/

bot.login(process.env.TOKEN)