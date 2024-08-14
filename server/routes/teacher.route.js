import express from "express";
import {
  test,
  signIn,
  signUp,
  getAllTeachers,
  updateTeacher,
  deleteTeacher,
} from "../controllers/teacher.controller.js";

const router = express.Router();

router.get("/test", test);
router.post("/signIn", signIn);
router.post("/signUp", signUp);
router.get("/allTeachers", getAllTeachers);
router.put("/updateTeacher/:id", updateTeacher);
router.delete("/deleteTeacher/:id", deleteTeacher);

export default router;
