"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const server_1 = require("./server");
const server = server_1.SERVER.instance;
const morgan_1 = __importDefault(require("morgan"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
server.init();
server.start().then((err) => {
    if (err)
        throw new Error("error al iniciar servidor") && console.log(err);
    server.app.use((0, morgan_1.default)("dev"));
    server.app.use(index_routes_1.default);
})
    .catch(() => {
    console.log("____________________________________________________");
});
