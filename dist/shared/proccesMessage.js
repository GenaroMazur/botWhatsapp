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
exports.persistConversation = exports.processMessage = void 0;
const sendMessajeToNum_1 = require("../service/sendMessajeToNum");
const modelsMessages_1 = require("./modelsMessages");
const node_persist_1 = __importDefault(require("node-persist"));
const nums = "0123456789";
const processMessage = (text, num, conversation, key) => __awaiter(void 0, void 0, void 0, function* () {
    const userMessage = text.toLowerCase();
    console.log(conversation);
    if (conversation.fullName === "") {
        if (userMessage.length > 4) {
            conversation.fullName = text;
            yield node_persist_1.default.updateItem(key, conversation);
            (0, sendMessajeToNum_1.sendToUser)(JSON.stringify((0, modelsMessages_1.dniModel)(num)));
        }
        else {
            const errorMessage = {
                "messaging_product": "whatsapp",
                "text": { "body": "nombre invalido, debe ser mayor a 4 caracteres" },
                "type": "text",
                "to": num.toString()
            };
            (0, sendMessajeToNum_1.sendToUser)(JSON.stringify(errorMessage));
        }
    }
    else if (conversation.fullName === null) {
        conversation.fullName = "";
        yield node_persist_1.default.updateItem(key, conversation);
        (0, sendMessajeToNum_1.sendToUser)(JSON.stringify((0, modelsMessages_1.welcomeModel)(num)));
    }
    else if (conversation.fullName !== "" && conversation.fullName !== null) {
        if ((userMessage.length == 7 || userMessage.length == 8) && userMessage.split("").every(value => nums.includes(value))) {
            conversation.document = userMessage;
            yield node_persist_1.default.updateItem(key, conversation);
            (0, sendMessajeToNum_1.sendToUser)(JSON.stringify(yield (0, modelsMessages_1.datesModels)(num)));
        }
        else {
            const errorMessage = {
                "messaging_product": "whatsapp",
                "text": { "body": "Numero de DNI invalido" },
                "type": "text",
                "to": num.toString()
            };
            (0, sendMessajeToNum_1.sendToUser)(JSON.stringify(errorMessage));
        }
    }
    else {
        const errorMessage = {
            "messaging_product": "whatsapp",
            "text": { "body": "No entiendo su peticion" },
            "type": "text",
            "to": num.toString()
        };
        (0, sendMessajeToNum_1.sendToUser)(JSON.stringify(errorMessage));
    }
});
exports.processMessage = processMessage;
const persistConversation = (message) => __awaiter(void 0, void 0, void 0, function* () {
    const cellphoneNum = message.entry[0].changes[0].value.messages[0].from;
    const conversation = yield node_persist_1.default.getItem(cellphoneNum);
    const turn = { "fullName": null, "document": "", "date": "", "hour": "", "place": "" };
    if (conversation === undefined) {
        yield node_persist_1.default.setItem(cellphoneNum, turn);
    }
    return conversation || turn;
});
exports.persistConversation = persistConversation;
