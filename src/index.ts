require("dotenv").config()
import { SERVER } from "./server";
const server = SERVER.instance
import morgan from "morgan"
import indexRouter from "./routes/index.routes";

server.init()
server.start().then((err) => {
    if (err) throw new Error("error al iniciar servidor") && console.log(err)

    server.app.use(morgan("dev"))
    server.app.use(indexRouter)

})
.catch(() => {
    console.log("____________________________________________________");
})