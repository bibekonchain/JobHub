// routes/extractData.routes.js
import express from "express";
import { handleExtractData } from "../controllers/extractData.controller.js";

const router = express.Router();

// Route to extract data from CV
router.post("/extract-data", handleExtractData);

export default router;
