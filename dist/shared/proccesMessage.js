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
    try {
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
        else if (conversation.fullName !== "" && conversation.fullName !== null && conversation.document === "") {
            if ((userMessage.length == 7 || userMessage.length == 8) && userMessage.split("").every(value => nums.includes(value))) {
                conversation.document = userMessage;
                yield node_persist_1.default.updateItem(key, conversation);
                (0, sendMessajeToNum_1.sendToUser)(JSON.stringify((0, modelsMessages_1.datesModels)(num)));
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
        else if (conversation.document !== "" && conversation.date === "") {
            if (userMessage.split("-").length === 2 && userMessage.split("-")[0].length === 2 && userMessage.split("-")[1].length === 2) {
                conversation.date = userMessage;
                yield node_persist_1.default.updateItem(key, conversation);
                console.log(conversation);
                (0, sendMessajeToNum_1.sendToUser)(JSON.stringify((0, modelsMessages_1.placeModels)(num)));
            }
            else {
                const errorMessage = {
                    "messaging_product": "whatsapp",
                    "text": { "body": "Fecha invalida invalido" },
                    "type": "text",
                    "to": num.toString()
                };
                (0, sendMessajeToNum_1.sendToUser)(JSON.stringify(errorMessage));
            }
        }
        else if (conversation.date !== "" && conversation.place === "") {
            const place = userMessage;
            if (place === "terminal unam" || place === "shopping posadas" || place === "obera bicentenario") {
                conversation.place = place;
                yield node_persist_1.default.updateItem(key, conversation);
                console.log(conversation);
                (0, sendMessajeToNum_1.sendToUser)(JSON.stringify((0, modelsMessages_1.momentModel)(num)));
            }
            else {
                const errorMessage = {
                    "messaging_product": "whatsapp",
                    "text": { "body": "Sucursal invalida" },
                    "type": "text",
                    "to": num.toString()
                };
                (0, sendMessajeToNum_1.sendToUser)(JSON.stringify(errorMessage));
            }
        }
        else if (conversation.place !== "" && conversation.hour === "") {
            if (userMessage !== "mañana" && userMessage !== "tarde") {
                const hora = userMessage.split(":");
                if (hora.length === 2, hora[0].length === 2, hora[1].length === 4) {
                    conversation.hour = userMessage;
                    yield node_persist_1.default.updateItem(key, conversation);
                    console.log(conversation);
                    (0, sendMessajeToNum_1.sendToUser)(JSON.stringify((0, modelsMessages_1.welcomeModel)(num)));
                    yield node_persist_1.default.clear();
                }
                else {
                    const errorMessage = {
                        "messaging_product": "whatsapp",
                        "text": { "body": "Hora invalida" },
                        "type": "text",
                        "to": num.toString()
                    };
                    (0, sendMessajeToNum_1.sendToUser)(JSON.stringify(errorMessage));
                }
            }
            else {
                (0, sendMessajeToNum_1.sendToUser)(JSON.stringify((0, modelsMessages_1.hourModel)(num, conversation, userMessage)));
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
    }
    catch (error) {
        console.log(error);
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
