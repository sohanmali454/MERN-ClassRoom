import mongoose from "mongoose";
const timetableSchema = new mongoose.Schema({
    classroom: {
        type: Schema.Types.ObjectId,
        ref: "Classroom",
        required: true,
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
        required: true,
    },
    day: {
        type: String,
        enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ],
        required: true,
    },
    periods: [{
        subject: {
            type: String,
            required: true,
        },
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
    }, ],
});

const Timetable = mongoose.model("Timetable", timetableSchema);

module.exports = Timetable;