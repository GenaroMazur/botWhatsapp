"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = require("express");
const whatsappController_1 = require("../controllers/whatsappController");
const seenMiddleware_1 = require("../middlewares/seenMiddleware");
const router = (0, express_1.Router)();
//subscription
router.get("/webhooks", whatsappController_1.subsWebhook);
//listening
router.post("/webhooks", seenMiddleware_1.seenMiddleware, whatsappController_1.receiveMessage, whatsappController_1.sendMessage);
exports.default = router;
