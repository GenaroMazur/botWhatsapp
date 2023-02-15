require("dotenv").config()
import { SERVER } from "./server";
const server = SERVER.instance
import morgan from "morgan"
import indexRouter from "./routes/index.routes";
import { endpointResponse } from "./helpers/succes";

server.init()
server.start().then((err) => {
    if (err) throw new Error("error al iniciar servidor") && console.log(err)

    server.app.use(morgan("dev"))
    server.app.use(indexRouter)

    server.app.use((req, res, next) => {
        return endpointResponse({res,status:false,code:404,message:"endpoint no disponible o inexistente"})
    })
})
.catch(() => {
    console.log("____________________________________________________");
})