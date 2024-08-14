import Classroom from "../models/classroom.model.js";
import Teacher from "../models/teacher.model.js";

// Function to create a new classroom
export const newClassroom = async(req, res) => {
    try {
        const { name, startTime, endTime, days, teacherId } = req.body;

        const classroom = new Classroom({
            name,
            startTime,
            endTime,
            days,
            teacher: teacherId,
        });

        await classroom.save();
        res
            .status(201)
            .json({ message: "Classroom created successfully", classroom });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create classroom" });
    }
};

// Function to get all classrooms
export const getAllClassrooms = async(req, res) => {
    try {
        const classrooms = await Classroom.find().populate("teacher");
        res.status(200).json({ classrooms: classrooms });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve classrooms" });
    }
};

//Function to Update Classroom

export const updateClassroom = async(req, res) => {
    try {
        const { id } = req.params;
        const { name, startTime, endTime, days, teacherId } = req.body;

        const classroom = await Classroom.findByIdAndUpdate(
            id, { name, startTime, endTime, days, teacher: teacherId }, { new: true, runValidators: true }
        );

        if (!classroom) {
            return res.status(404).json({ error: "Classroom not found" });
        }

        res
            .status(200)
            .json({ message: "Classroom updated successfully", classroom });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update classroom" });
    }
};

// Function to delete Classroom
export const deleteClassroom = async(req, res) => {
    const { id } = req.params;

    try {
        const classroom = await Classroom.findByIdAndDelete(id);
        if (!classroom) {
            return res.status(404).json({ message: "Classroom not found" });
        }
        res.status(200).json({ message: "Classroom deleted successfully" });
    } catch (error) {
        console.error("Error deleting classroom:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Function to Assign teacher for classroom

export const assignTeacherClassroom = async(req, res) => {
    const { classroomId } = req.params;
    const { teacherId } = req.body;

    try {
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        const existingClassroom = await Classroom.findOne({ teacher: teacherId });
        if (existingClassroom) {
            return res
                .status(400)
                .json({ message: "Teacher is already assigned to another classroom" });
        }

        const classroom = await Classroom.findByIdAndUpdate(
            classroomId, { teacher: teacherId }, { new: true }
        );

        if (!classroom) {
            return res.status(404).json({ message: "Classroom not found" });
        }

        res
            .status(200)
            .json({ message: "Teacher assigned successfully", classroom });
    } catch (error) {
        res.status(500).json({ message: "Failed to assign teacher", error });
    }
};