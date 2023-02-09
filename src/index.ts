import { SERVER } from "./server";
const server = SERVER.instance
import morgan from "morgan"
require("dotenv").config()
import bodyParser from "body-parser"
import fetch from "cross-fetch"
server.init()
server.start().then((err) => {
    if (err) throw new Error("error al iniciar servidor") && console.log(err)

    server.app.use(morgan("dev"))
    server.app.use(bodyParser.json())
    server.app.get("/webhooks", (req, res) => {
        console.log(req.query);
        const devolver: any = req.query

        res.send(devolver["hub.challenge"])

    })
    server.app.post("/webhooks", (req, res) => {
        console.log(req.body);
        let body:any ={
            "messaging_product": "whatsapp",
            "to": "53764560397",
            "text":{"body":"Hola genaro"}
        }
        body = JSON.stringify(body)
        fetch("https://graph.facebook.com/v15.0/109330648741829/messages",{
            method:"POST",
            headers:{
                authorization:"Bearer EAAIFmZAUGCsYBAFRDse3kHsaDtTpSznzjdA11ZAOYZAdLXnu6gIBdfG032PHIfF5J4EGp1KpWb4ml13IuqgdPojY2ZCkQFS3UvpwHPK1JXWS5oe5KdiPc8WGFPLAqHsJJAL7wPNfrCqviqzZAdxNU7VQ6yinw7B3PSih2DxnJ2xXveETZCPgq1vJUUO6C5l4gPTsi16AL9ZAQZDZD",
                
            },
            body
        }).then(a=>console.log(a))
        console.log(body);
        
        res.status(200).end()
    })
    server.app.use(bodyParser.json())
})
    .catch(() => {
        console.log("____________________________________________________");
    })