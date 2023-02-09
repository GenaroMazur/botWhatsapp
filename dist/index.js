"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const server = server_1.SERVER.instance;
const morgan_1 = __importDefault(require("morgan"));
require("dotenv").config();
const body_parser_1 = __importDefault(require("body-parser"));
const node_fetch_1 = __importDefault(require("node-fetch"));
server.init();
server.start().then((err) => {
    if (err)
        throw new Error("error al iniciar servidor") && console.log(err);
    server.app.use((0, morgan_1.default)("dev"));
    server.app.use(body_parser_1.default.json());
    server.app.get("/webhooks", (req, res) => {
        console.log(req.query);
        const devolver = req.query;
        res.send(devolver["hub.challenge"]);
    });
    server.app.post("/webhooks", (req, res) => {
        console.log(req.body);
        let body = {
            "messaging_product": "whatsapp",
            "to": "3764560397",
            "type": "template",
            "text": {
                "body": "Hola genaro"
            }
        };
        body = JSON.stringify(body);
        (0, node_fetch_1.default)("https://graph.facebook.com/v15.0/109330648741829/messages", {
            method: "POST",
            headers: {
                authorization: "Bearer EAAIFmZAUGCsYBAFRDse3kHsaDtTpSznzjdA11ZAOYZAdLXnu6gIBdfG032PHIfF5J4EGp1KpWb4ml13IuqgdPojY2ZCkQFS3UvpwHPK1JXWS5oe5KdiPc8WGFPLAqHsJJAL7wPNfrCqviqzZAdxNU7VQ6yinw7B3PSih2DxnJ2xXveETZCPgq1vJUUO6C5l4gPTsi16AL9ZAQZDZD",
            },
            body
        });
        res.status(200).end();
    });
    server.app.use(body_parser_1.default.json());
})
    .catch(() => {
    console.log("____________________________________________________");
});
