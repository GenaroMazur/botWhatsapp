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
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    const token = process.env.TOKEN || "";
    console.log(message);
    const messageId = (_c = (_b = (_a = message.entry[0]) === null || _a === void 0 ? void 0 : _a.changes[0]) === null || _b === void 0 ? void 0 : _b.value.messages[0]) === null || _c === void 0 ? void 0 : _c.id;
    console.log("ESTADO : ", (_g = (_f = (_e = (_d = message.entry[0]) === null || _d === void 0 ? void 0 : _d.changes[0]) === null || _e === void 0 ? void 0 : _e.value) === null || _f === void 0 ? void 0 : _f.statuses[0]) === null || _g === void 0 ? void 0 : _g.status);
    console.log("TIPO : ", (_j = (_h = message.entry[0]) === null || _h === void 0 ? void 0 : _h.changes[0]) === null || _j === void 0 ? void 0 : _j.field);
    if (messageId !== undefined) {
        let responseRead = {
            "headers": {
                "authorization": token,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ status: "read", messaging_product: "whatsapp", message_id: messageId })
        };
        (0, cross_fetch_1.default)("https://graph.facebook.com/v16.0/109330648741829/messages", responseRead);
    }
    if (((_m = (_l = (_k = message.entry[0]) === null || _k === void 0 ? void 0 : _k.changes[0]) === null || _l === void 0 ? void 0 : _l.value) === null || _m === void 0 ? void 0 : _m.errors) !== undefined) {
        console.log("¡ SUCEDIO UN PROBLEMA !");
        console.error(message.entry[0].changes[0].value.errors);
        return;
    }
    return;
});
exports.indexRouter = indexRouter;
