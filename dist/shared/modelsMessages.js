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
exports.datesModels = exports.dniModel = exports.welcomeModel = void 0;
const Turnos_1 = require("../database/models/Turnos");
const helper_1 = require("../helpers/helper");
const welcomeMessage = "*¡Bienvenido a Servicios Urbanos S.A!*\n\nPara sacar turno para reclamos ingresar los siguientes datos.\nSu nombre y apellido completos. \n\nPor favor para otros tipos de consultas comunicarse al 0810-444-7823.";
const dniMessage = "Ahora Debe ingresar su numero de documento *sin puntos ni comas*.\n Por ejemplo: 44736152";
const welcomeModel = (num) => {
    return {
        "messaging_product": "whatsapp",
        "type": "text",
        "to": num,
        "text": { body: welcomeMessage }
    };
};
exports.welcomeModel = welcomeModel;
const dniModel = (num) => {
    return {
        "messaging_product": "whatsapp",
        "type": "text",
        "to": num,
        "text": { body: dniMessage }
    };
};
exports.dniModel = dniModel;
const datesModels = (num) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {
        "$gte": (0, helper_1.dateZoneString)((0, helper_1.dateNowTimestamp)(), 'zu-ZA', 'America/Argentina/Cordoba').split(" ")[0],
        "$lte": (0, helper_1.dateZoneString)((0, helper_1.dateNowTimestamp)() + 60 * 60 * 24 * 15, 'zu-ZA', 'America/Argentina/Cordoba').split(" ")[0]
    };
    console.log(query);
    let listDate = {
        "messaging_product": "whatsapp",
        "type": "interactive",
        "to": num.toString(),
        "interactive": {
            "type": "list",
            "body": { "text": "Eliga la fecha la cual quiera reservar su turno" },
            "action": {
                "button": "Fechas Disponibles",
                "sections": [
                    {
                        "title": "",
                        "rows": [
                        ///AQUI VAN LAS FECHAS
                        ]
                    }
                ]
            }
        }
    };
    const turns = yield Turnos_1.Turn.find({
        "reserved": false,
        "day": query
    }).select({
        "day": 1
    });
    turns.forEach((turn, index) => {
        listDate.interactive.action.sections[0].rows.push({ "id": index.toString(), "title": turn.day, "description": "disponible" });
    });
    console.log(listDate.interactive.action.sections[0].rows);
    return listDate;
});
exports.datesModels = datesModels;
