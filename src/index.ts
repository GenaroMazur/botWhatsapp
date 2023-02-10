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
        const header = "¡Bienvenido a Servicios Urbanos S.A!"
        const texto = "Para obtener un turno para tramitar el BEEG debe enviar los siguientes datos:\n1) Nombre y apellido.\n2) DNI\n3) Lugar de preferencia para realizar el trámite: Posadas Plaza Shopping o Terminal UNaM.\n4) Horario aprox. disponible\n\n*Posadas Plaza Shopping*: De Lunes a Sábados de 9:00hs a 21:00hs.\n\n*Terminal UNaM*: De Lunes a Viernes de 08:30hs a 13:00hs / 14:00hs a 17:30hs. Sábados de 08:00hs a 12:00hs.\n"
        const footer = "Por favor para otros tipos de consultas comunicarse al 0810-444-7823."

        let body: any = {
            "messaging_product": "whatsapp",
            "to": "543764560397",
            "components": [
                {
                    "type": "header",
                    "parameters": [
                        {
                            "type": "text",
                            "text":`${header+footer}`
                        }
                    ]
                },{
                    "type":"body",
                    "parameters":[
                        {
                            "type":"text",
                            "text":`${texto}`
                        }
                    ]
                }
            ]
        }

        body = JSON.stringify(body)
        const token = process.env.TOKEN || ""
        if (req.body.entry[0].changes[0].value.messages !== undefined) {
            console.log(req.body.entry[0].changes[0].value.messages);

            fetch("https://graph.facebook.com/v15.0/109330648741829/messages", {
                method: "POST",
                headers: {
                    authorization: token,
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