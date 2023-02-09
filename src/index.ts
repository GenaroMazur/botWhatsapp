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
        console.log(JSON.stringify(req.body.entry[0].changes[0]));
        console.log("_----------------------------------------------------------");
        
        let body:any ={
            "messaging_product": "whatsapp",
            "to": "543764560397",
            "text":{"body":"Hola genaro"}
        }
        body = JSON.stringify(body)
        const token = process.env.TOKEN || ""
        if(req.body.entry[0].changes[0].value.messages !== undefined){
            console.log(req.body.entry[0].changes[0].value.messages);
            
            fetch("https://graph.facebook.com/v15.0/109330648741829/messages",{
                method:"POST",
                headers:{
                    authorization:token,
                    "Content-Type": "application/json"
                },
                body
            })
        }
        
        res.status(200).end()
    })
    server.app.use(bodyParser.json())
})
    .catch(() => {
        console.log("____________________________________________________");
    })