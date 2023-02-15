import { Router } from "express";
import { createTurns, deleteTurn, turnDetail, turnsList, updateTurn } from "../controllers/turnsController";
const router = Router()


router.route("/")
    .get(turnsList)
    .post(createTurns)
router.route("/:turnId")
    .get(turnDetail)
    .put(updateTurn)
    .delete(deleteTurn)

export default router