import { SERVER } from "./server";
const server = SERVER.instance
import morgan from "morgan"
require("dotenv").config()
import bodyParser from "body-parser"
import { indexRouter } from "./routes/index.routes";
import { whastappObjectResponse } from "./interfaces/whatsappResponseInterface";

server.init()
server.start().then((err) => {
    if (err) throw new Error("error al iniciar servidor") && console.log(err)

    server.app.use(morgan("dev"))
    server.app.use(bodyParser.json())

    //subscription
    server.app.get("/webhooks", (req, res) => {
        const devolver: any = req.query
        res.send(devolver["hub.challenge"])
    })

    //listening
    server.app.post("/webhooks", (req, res) => {
        const message:whastappObjectResponse = req.body
        if(message.object==="whatsapp_business_account"){
            if(message.entry[0].changes[0].field==="messages"){
                if(message.entry[0].changes[0].value.messaging_product==="whatsapp"){
                    indexRouter(req.body)
                }
            }
        }
        return res.status(200).end()
    })

    server.app.use(bodyParser.json())
})
    .catch(() => {
        console.log("____________________________________________________");
    })