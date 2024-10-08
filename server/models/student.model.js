import mongoose from "mongoose";
const { Schema } = mongoose;

const StudentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  classroom: {
    type: Schema.Types.ObjectId,
    ref: "Classroom",
    default: null,
  },
});

const Student = mongoose.model("Student", StudentSchema);

export default Student;
