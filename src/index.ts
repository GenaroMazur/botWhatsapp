import { SERVER } from "./server";
const server = SERVER.instance
import morgan from "morgan"
import { endpointResponse } from "./helpers/succes";
require("dotenv").config()
import bodyParser from "body-parser"

server.init()
server.start().then((err)=>{
    if(err)throw new Error("error al iniciar servidor") && console.log(err)
    
    server.app.use(morgan("dev"))
    server.app.use(bodyParser.json())
    server.app.get("/webhooks",(req, res)=>{
        console.log(req.query);
        const devolver:any = req.query

        res.send(devolver["hub.challenge"])

    })
    server.app.use(bodyParser.json())
})
.catch(()=>{
    console.log("____________________________________________________");
})