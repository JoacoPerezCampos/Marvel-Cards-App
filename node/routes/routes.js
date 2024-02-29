import express from "express"
import {createRegister, deleteRegister, getAllRegisters, getRegister} from "../controllers/appControllers.js"
const router = express.Router()

router.get("/", getAllRegisters)
router.get("/:id", getRegister)
router.post("/", createRegister)
router.delete("/:id", deleteRegister)

export default router