import express, { Router, Request, Response } from "express";
import { processMessage } from "../controllers/message.controller";

const router: Router = express.Router();

router.post("/", processMessage);

export default router;
