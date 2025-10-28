import express from "express";
import { getData, storeData } from "../controllers/moniter.controller.js";

const router = express.Router();

router.get("/getdata", getData);
router.post("/storedata", storeData)

export default router;