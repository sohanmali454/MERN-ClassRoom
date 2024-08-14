import mongoose from "mongoose";

const { Schema } = mongoose;

const classroomSchema = new Schema({
  name: {
    type: String,
    unique: true,
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
  days: {
    type: [String],
    required: true,
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    default: null,
  },
});

const Classroom = mongoose.model("Classroom", classroomSchema);

export default Classroom;
