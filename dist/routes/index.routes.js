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
exports.indexRouter = void 0;
const indexRouter = (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (message.entry[0].changes[0].errors !== undefined) {
        console.log("¡ SUCEDIO UN PROBLEMA !");
        console.error(message.entry[0].changes[0].errors);
        return;
    }
    console.log(message.entry[0].changes[0].statuses);
    console.log((_a = message.entry[0].changes[0].messages) === null || _a === void 0 ? void 0 : _a.contacts);
    console.log(message.entry[0].changes[0].errors);
    console.log(message.entry[0].changes[0]);
    return;
});
exports.indexRouter = indexRouter;
