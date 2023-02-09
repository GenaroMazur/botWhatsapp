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
                authorization:"Bearer EAAIFmZAUGCsYBABRYTNgb8VT7WtD7ZBCIRDLL8CC6ZCsLzOmjPRG4C7P8zhcHMFZCskqoRCgQQiOnnvT3fUvuddOZAVXk7WgHZB1Y7aqrg9cfwJLg3QTpaZAwP14zM7tzyguB0qlytVofSd3d3aZCGLYPmvFErMC0352LPMWZAqlxgZAZAFi0vfGd7C81KWLhmZC29ZBYZBvRsZB4FNEQZDZD",
                "Content-Type": "application/json"
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