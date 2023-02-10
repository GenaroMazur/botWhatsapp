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
const index_routes_1 = require("./routes/index.routes");
server.init();
server.start().then((err) => {
    if (err)
        throw new Error("error al iniciar servidor") && console.log(err);
    server.app.use((0, morgan_1.default)("dev"));
    server.app.use(body_parser_1.default.json());
    //subscription
    server.app.get("/webhooks", (req, res) => {
        const devolver = req.query;
        res.send(devolver["hub.challenge"]);
    });
    //listening
    server.app.post("/webhooks", (req, res) => {
        (0, index_routes_1.indexRouter)(req.body);
    });
    server.app.use(body_parser_1.default.json());
})
    .catch(() => {
    console.log("____________________________________________________");
});
