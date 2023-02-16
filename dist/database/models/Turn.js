"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Turn = void 0;
const mongoose_1 = require("mongoose");
const turnsSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Schema.Types.ObjectId },
    turn: { type: String, required: true },
    hour: { type: String, required: true },
    reserved: { type: Boolean, default: false },
    cellphoneNumber: { type: String, default: "" },
    document: { type: String, default: "" },
    fullName: { type: String, default: "" },
});
const turnoSchema = new mongoose_1.Schema({
    date: { type: String, required: true },
    boxxes: { type: Number, required: true },
    day: { type: String, required: true },
    place: { type: String, required: true },
    turns: { type: [turnsSchema], required: true }
}, {
    "collection": "BOT_Turn",
    "versionKey": false
});
exports.Turn = (0, mongoose_1.model)("Turn", turnoSchema);
