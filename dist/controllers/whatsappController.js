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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.receiveMessage = exports.subsWebhook = void 0;
const proccesMessage_1 = require("../shared/proccesMessage");
const subsWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const myToken = process.env.TOKEN;
    const tokenHook = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];
    if (tokenHook != null && challenge != null && myToken === tokenHook) {
        res.send(challenge);
    }
    else {
        res.status(400).end();
    }
});
exports.subsWebhook = subsWebhook;
const receiveMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const whatsappMessage = req.body;
    try {
        if (whatsappMessage.object === "whatsapp_business_account" && whatsappMessage.entry[0].changes[0].field === "messages" && whatsappMessage.entry[0].changes[0].value.messaging_product === "whatsapp") {
            const message = whatsappMessage.entry[0].changes[0].value.messages;
            if (typeof message !== "undefined") {
                next();
            }
        }
        res.status(200).send("EVENT_RECEIVED");
    }
    catch (error) {
        console.log(error);
        res.status(200).send("EVENT_RECEIVED");
    }
});
exports.receiveMessage = receiveMessage;
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const whastappMessage = req.body;
        const text = ((_a = whastappMessage.entry[0].changes[0].value.messages[0].text) === null || _a === void 0 ? void 0 : _a.body) || "ERROR";
        const celphoneNum = whastappMessage.entry[0].changes[0].value.messages[0].from;
        (0, proccesMessage_1.processMessage)(text, 543764560397, yield (0, proccesMessage_1.persistConversation)(whastappMessage), celphoneNum);
    }
    catch (error) {
        console.log(error);
    }
    return;
});
exports.sendMessage = sendMessage;
