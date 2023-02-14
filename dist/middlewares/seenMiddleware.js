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
exports.seenMiddleware = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const token = process.env.TOKEN || "";
const seenMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = req.body;
        if (message.entry[0].changes[0].value.messages) {
            const messageId = message.entry[0].changes[0].value.messages[0].id;
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
        }
    }
    catch (error) {
        console.log(error);
    }
    next();
});
exports.seenMiddleware = seenMiddleware;
