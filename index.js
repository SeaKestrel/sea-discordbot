let { Client } = require("discord.js")
let ytdl = require("ytdl-core")
let bot = new Client()

bot.on("message", msg => {
    if(msg.content.startsWith("/play")){
        if(!msg.member.voice.channel){
            msg.reply("Pas p'ssible ça nanan")
        }else{
            if(msg.content.split(" ")[1] === undefined) return msg.reply("Je veux bien te jouer un p'tit truc mais je veux bien savoir quoi :joy:\nTu as à ta disposition:\n-sea\n-storm\nallez là!")
            msg.reply("Attends, j'arrive d'ici peu...")
            setTimeout(() =>{
                msg.member.voice.channel.join().then(connection => {
                    msg.reply("Me voilà! Je cherche ton son d'ambiance...")
                    let url;
                    switch(msg.content.split(" ")[1]){
                        case "sea":
                            url = "https://www.youtube.com/watch?v=WHPEKLQID4U";
                        break;
                        case "storm":
                            url = "https://www.youtube.com/watch?v=ekXFslHOvZ8";
                        break;
                        default:
                            return msg.reply("Ça existe pas andouille!\nc'est soit *sea* soit *storm*!")
                    }
                    let dispatcher = connection.play(ytdl(url, {filter: "audioonly"}));
                    dispatcher.setVolume(1)
                    dispatcher.on("end", () => {
                        connection.disconnect()
                    })
                })
            },5000)
        }
    }
})


bot.login("ODA5MDA1Mzc5MDczNjA1NjMy.YCOy-A.lb7tCRAMqkDL2rQsfSWbufc_A8Y")