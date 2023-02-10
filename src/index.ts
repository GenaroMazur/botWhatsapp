import { SERVER } from "./server";
const server = SERVER.instance
import morgan from "morgan"
require("dotenv").config()
import bodyParser from "body-parser"
import { indexRouter } from "./routes/index.routes";

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
        indexRouter(req.body)
    })

    server.app.use(bodyParser.json())
})
    .catch(() => {
        console.log("____________________________________________________");
    })