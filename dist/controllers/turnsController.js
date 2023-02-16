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
exports.deleteTurn = exports.updateTurn = exports.turnDetail = exports.createTurns = exports.turnsList = void 0;
const Turn_1 = require("../database/models/Turn");
const catchAsync_1 = require("../helpers/catchAsync");
const succes_1 = require("../helpers/succes");
const helper_1 = require("../helpers/helper");
const turnGenerate_1 = require("../shared/turnGenerate");
exports.turnsList = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let date = (0, helper_1.dateZoneString)((0, helper_1.dateNowTimestamp)(), 'zu-ZA', 'America/Argentina/Cordoba').split(" ")[0];
        req.query.date !== undefined ? date = req.query.date : "";
        const turns = (_a = (yield Turn_1.Turn.findOne({ date, "turns.reserved": true }))) === null || _a === void 0 ? void 0 : _a.turns.filter(turn => turn.reserved);
        (0, succes_1.endpointResponse)({ res, code: turns ? 200 : 204, message: "Lista de turnos", "body": turns });
    }
    catch (error) {
        console.log(error);
        return (0, succes_1.endpointResponse)({ res, code: 500, message: "OPSS" });
    }
}));
exports.createTurns = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const creation = {
            "place": "shopping posadas",
            "daysOfWeek": req.body.daysOfWeek,
            "dateStart": req.body.dateStart,
            "dateEnd": req.body.dateEnd,
            "morning": {
                "boxxes": req.body.morning.boxxes,
                "start": req.body.morning.start,
                "end": req.body.morning.end
            },
            "evening": {
                "boxxes": req.body.morning.boxxes,
                "start": req.body.morning.start,
                "end": req.body.morning.end
            }
        };
        (0, turnGenerate_1.generateTurns)(creation);
        (0, succes_1.endpointResponse)({ res, "message": "¡ Turnos generados !", code: 201 });
    }
    catch (error) {
        console.log(error);
        return (0, succes_1.endpointResponse)({ res, code: 500, message: "OPSS" });
    }
}));
exports.turnDetail = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        console.log(error);
        return (0, succes_1.endpointResponse)({ res, code: 500, message: "OPSS" });
    }
}));
exports.updateTurn = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        console.log(error);
        return (0, succes_1.endpointResponse)({ res, code: 500, message: "OPSS" });
    }
}));
exports.deleteTurn = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        console.log(error);
        return (0, succes_1.endpointResponse)({ res, code: 500, message: "OPSS" });
    }
}));
