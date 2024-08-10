import express from "express";
import { test, signIn, signUp } from "../controllers/student.controller.js";

const router = express.Router();

router.get("/test", test);
router.post("/signIn", signIn);
router.post("/signUp", signUp);

export default router;