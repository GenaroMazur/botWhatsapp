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
exports.generateTurns = void 0;
const node_persist_1 = __importDefault(require("node-persist"));
const Turn_1 = require("../database/models/Turn");
const daysOfWeek = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
const generateTurns = (creation) => __awaiter(void 0, void 0, void 0, function* () {
    const daysDiff = (new Date(creation.dateStart).getTime() - new Date(creation.dateEnd).getTime()) / (1000 * 60 * 60 * 24);
    const openHourMorning = parseInt(creation.morning.start.substring(0, 2));
    const closeHourMorning = parseInt(creation.morning.end.substring(0, 2));
    const openMinutesMorning = creation.morning.start.substring(3, 5);
    const openHourEvening = parseInt(creation.evening.start.substring(0, 2));
    const closeHourEvening = parseInt(creation.evening.end.substring(0, 2));
    const openMinutesEvening = creation.evening.start.substring(3, 5);
    console.log("inicializar horas");
    let turn = {
        "cellphoneNumber": "",
        "document": "",
        "fullName": "",
        "hour": "",
        "turn": "mañana",
        "reserved": false
    };
    const morningBoxxes = creation.morning.boxxes;
    const eveningBoxxes = creation.evening.boxxes;
    let date = new Date(`${new Date().getFullYear()}-${creation.dateStart}`);
    yield node_persist_1.default.setItem("openTurns", []);
    console.log("crear archivo persistente");
    for (let x = 1; x <= daysDiff; x++) {
        console.log("bucle dia num:", x);
        let openTurns = [];
        if (creation.daysOfWeek.includes(daysOfWeek[date.getDay()])) {
            turn.turn = "mañana";
            turn.hour = `${openHourMorning}:${openMinutesMorning}hs`;
            openTurns.push(turn);
            for (let y = openHourMorning; y < closeHourMorning; y++) {
                console.log("bucle hora mañana num:", x);
                let minutes = y === openHourMorning ? parseInt(turn.hour.substring(3, 5)) : 0;
                while (minutes < 60 && minutes + 6 - morningBoxxes < 60) {
                    minutes += (6 - morningBoxxes);
                    turn.hour = `${y}:${minutes < 10 ? `0${minutes}` : minutes}hs`;
                    openTurns.push(turn);
                }
            }
            turn.turn = "tarde";
            turn.hour = `${openHourEvening}:${openMinutesEvening}hs`;
            openTurns.push(turn);
            for (let y = openHourEvening; y < closeHourEvening; y++) {
                console.log("bucle hora tarde num:", x);
                let minutes = y === openHourEvening ? parseInt(turn.hour.substring(3, 5)) : 0;
                while (minutes < 60 || minutes + 6 - eveningBoxxes < 60) {
                    minutes += (6 - eveningBoxxes);
                    turn.hour = `${y}:${minutes < 10 ? `0${minutes}` : minutes}hs`;
                    openTurns.push(turn);
                }
            }
            const dayTurn = {
                "date": `${date.getFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`,
                "place": creation.place,
                "turns": openTurns,
                "day": daysOfWeek[date.getDay()]
            };
            yield node_persist_1.default.updateItem("openTurns", [...yield node_persist_1.default.getItem("openTurns"), dayTurn]);
        }
        date.setDate(date.getDate() + 1);
    }
    Turn_1.Turn.bulkSave(yield node_persist_1.default.getItem("openTurns"));
    console.log("turnos creados !");
});
exports.generateTurns = generateTurns;
