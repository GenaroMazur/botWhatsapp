"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const turnsController_1 = require("../controllers/turnsController");
const router = (0, express_1.Router)();
router.route("/")
    .get(turnsController_1.turnsList)
    .post(turnsController_1.createTurns);
router.route("/:turnId")
    .get(turnsController_1.turnDetail)
    .put(turnsController_1.updateTurn)
    .delete(turnsController_1.deleteTurn);
exports.default = router;
