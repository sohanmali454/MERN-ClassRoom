import express from "express";
import {
    test,
    signIn,
    signUp,
    getAllStudents,
    updateStudent,
    deleteStudent,
    assignClassroomStudent
} from "../controllers/student.controller.js";

const router = express.Router();

router.get("/test", test);
router.post("/signIn", signIn);
router.post("/signUp", signUp);
router.get("/allStudents", getAllStudents);
router.put("/updateStudent/:id", updateStudent);
router.delete("/deleteStudent/:id", deleteStudent);
router.put("/assignClassroomStudent/:studentId", assignClassroomStudent);


export default router;