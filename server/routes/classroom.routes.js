import express from "express";
import {
    newClassroom,
    getAllClassrooms,
    updateClassroom,
    deleteClassroom,
    assignTeacherClassroom,
} from "../controllers/classroom.controller.js";

const router = express.Router();

router.post("/newClassroom", newClassroom);
router.get("/getAllClassrooms", getAllClassrooms);
router.put("/updateClassroom/:id", updateClassroom);
router.delete("/deleteClassroom/:id", deleteClassroom);
router.put("/assignTeacherClassroom/:classroomId", assignTeacherClassroom);

export default router;