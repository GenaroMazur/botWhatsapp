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
require("dotenv").config();
const indexRouter = (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const token = process.env.TOKEN || "";
    const messageId = (_b = (_a = message.entry[0].changes[0]) === null || _a === void 0 ? void 0 : _a.value.messages[0]) === null || _b === void 0 ? void 0 : _b.id;
    if (messageId !== undefined) {
        let responseRead = {
            "headers": {
                "authorization": token,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ status: "read", messaging_product: "whatsapp", messageId })
        };
        (0, cross_fetch_1.default)("https://graph.facebook.com/v16.0/109330648741829/messages", responseRead).then(r => console.log(r));
        if (message.entry[0].changes[0].value.errors !== undefined) {
            console.log("¡ SUCEDIO UN PROBLEMA !");
            console.error(message.entry[0].changes[0].value.errors);
            return;
        }
    }
    return;
});
exports.indexRouter = indexRouter;
