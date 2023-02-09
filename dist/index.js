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
const cross_fetch_1 = __importDefault(require("cross-fetch"));
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
            "to": "53764560397",
            "text": { "body": "Hola genaro" }
        };
        body = JSON.stringify(body);
        (0, cross_fetch_1.default)("https://graph.facebook.com/v15.0/109330648741829/messages", {
            method: "POST",
            headers: {
                authorization: "Bearer EAAIFmZAUGCsYBABRYTNgb8VT7WtD7ZBCIRDLL8CC6ZCsLzOmjPRG4C7P8zhcHMFZCskqoRCgQQiOnnvT3fUvuddOZAVXk7WgHZB1Y7aqrg9cfwJLg3QTpaZAwP14zM7tzyguB0qlytVofSd3d3aZCGLYPmvFErMC0352LPMWZAqlxgZAZAFi0vfGd7C81KWLhmZC29ZBYZBvRsZB4FNEQZDZD",
                "Content-Type": "application/json"
            },
            body
        }).then(a => console.log(a));
        console.log(body);
        res.status(200).end();
    });
    server.app.use(body_parser_1.default.json());
})
    .catch(() => {
    console.log("____________________________________________________");
});
