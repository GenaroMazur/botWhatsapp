"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = require("express");
const whatsappController_1 = require("../controllers/whatsappController");
const seenMiddleware_1 = require("../middlewares/seenMiddleware");
const turn_routes_1 = __importDefault(require("./turn.routes"));
const router = (0, express_1.Router)();
//subscription
router.get("/webhooks", whatsappController_1.subsWebhook);
//listening
router.post("/webhooks", seenMiddleware_1.seenMiddleware, whatsappController_1.receiveMessage, whatsappController_1.sendMessage);
router.use("/turnos", turn_routes_1.default);
exports.default = router;
