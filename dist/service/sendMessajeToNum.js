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
exports.sendToNum = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
require("dotenv").config();
const token = process.env.TOKEN || "";
const sendToNum = (message, num) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        "headers": {
            "authorization": token,
            "Content-Type": "application/json"
        },
        "method": "POST",
        "body": message
    };
    (0, cross_fetch_1.default)("https://graph.facebook.com/v15.0/109330648741829/messages", options);
});
exports.sendToNum = sendToNum;
