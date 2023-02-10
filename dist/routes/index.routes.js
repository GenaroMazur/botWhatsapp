"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexRouter = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const indexRouter = (message) => __awaiter(void 0, void 0, void 0, function* () {
    const messageId = message.entry[0].changes[0].value.messages[0].id;
    let responseRead = JSON.stringify({ status: "read" });
    (0, cross_fetch_1.default)("https://graph.facebook.com/v15.0/109330648741829/messages/" + messageId, {
        method: "PUT",
        body: responseRead
    }).then(r => console.log(r));
    if (message.entry[0].changes[0].value.errors !== undefined) {
        console.log("¡ SUCEDIO UN PROBLEMA !");
        console.error(message.entry[0].changes[0].value.errors);
        return;
    }
    console.log("________________________________________________________");
    console.log(1, message.entry[0].changes[0].value);
    console.log(2, message.entry[0].changes[0].value.messages);
    console.log(3, message.entry[0].changes[0].value.errors);
    console.log(4, message.entry[0].changes[0].value.messages[0]);
    console.log("________________________________________________________");
    return;
});
exports.indexRouter = indexRouter;
