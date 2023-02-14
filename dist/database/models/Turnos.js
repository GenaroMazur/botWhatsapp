"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Turn = void 0;
const mongoose_1 = require("mongoose");
const turnoSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        trim: true,
        default: ""
    },
    document: {
        type: String,
        trim: true,
        default: ""
    },
    reserved: {
        type: Boolean,
        default: false
    },
    hour: {
        type: String,
        trim: true,
        default: ""
    },
    place: {
        type: String,
        default: "",
    },
    day: {
        type: String,
        trim: true,
        required: [true, "Fecha requerida"]
    },
    confirm: {
        type: Boolean,
        default: false
    }
}, {
    collection: "BOT_Turn",
    timestamps: true,
    versionKey: false,
});
exports.Turn = (0, mongoose_1.model)("Turn", turnoSchema);
