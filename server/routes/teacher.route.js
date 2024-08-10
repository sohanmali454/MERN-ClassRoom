import express from "express";
import { test, signIn, signUp } from "../controllers/teacher.controller.js";

const router = express.Router();

router.get("/test", test);
router.post("/signIn", signIn);
router.post("/signUp", signUp);

export default router;