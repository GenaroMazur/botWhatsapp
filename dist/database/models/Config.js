"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigBot = void 0;
const mongoose_1 = require("mongoose");
const turnInfoModel = new mongoose_1.Schema({
    "boxxes": { type: String, required: true },
    "open": { type: String, required: true },
    "close": { type: String, required: true }
});
const turnModel = new mongoose_1.Schema({
    "mañana": { type: turnInfoModel, required: true },
    "tarde": { type: turnInfoModel, required: true }
});
const daysModel = new mongoose_1.Schema({
    day: { type: String, required: true },
    turn: { type: [turnModel], required: true }
});
const configSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Schema.Types.ObjectId },
    place: { type: String, required: true },
    days: { type: [daysModel], required: true },
    description: { type: String, required: true }
}, {
    collection: "BOT_Config",
    versionKey: false
});
exports.ConfigBot = (0, mongoose_1.model)("ConfigBot", configSchema);
