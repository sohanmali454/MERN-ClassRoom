import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const Teacher = mongoose.model("Teacher", TeacherSchema);

export default Teacher;