import Classroom from "../models/classroom.model.js";
import Student from "../models/student.model.js";

export const test = (req, res) => {
  res.json({ message: "API is Working" });
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const validUser = await Student.findOne({ email: email });

    if (!validUser) {
      console.log("User not found!");
      return res.status(404).json({ message: "User not found!" });
    }

    if (password !== validUser.password) {
      console.log("Invalid credentials!");
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    return res
      .status(200)
      .json({ message: "Sign in successful!", user: validUser });
  } catch (error) {
    console.error("Error during sign-in:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await Student.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const newUser = new Student({
      name: name,
      email: email,
      password: password,
    });

    await newUser.save();

    return res
      .status(201)
      .json({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    console.error("Error during sign-up:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Get All Students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    return res.status(200).json({ students: students });
  } catch (error) {
    console.error("Error fetching students:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Update Student By Id
export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const updatedData = { name, email, password };

    const updatedStudent = await Student.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found!" });
    }

    return res.status(200).json({
      message: "Student updated successfully!",
      student: updatedStudent,
    });
  } catch (error) {
    console.error("Error updating student:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Delete Student by Id
export const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found!" });
    }

    return res.status(200).json({ message: "Student deleted successfully!" });
  } catch (error) {
    console.error("Error deleting student:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

//Classroom Assign

export const assignClassroomStudent = async (req, res) => {
  const { studentId } = req.params;
  const { classroomId } = req.body;

  try {
    console.log("Classroom ID:", classroomId);

    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      console.log("Classroom not found with ID:", classroomId);
      return res.status(404).json({ message: "Classroom not found" });
    }

    const student = await Student.findByIdAndUpdate(
      studentId,
      { classroom: classroomId },
      { new: true }
    );

    if (!student) {
      console.log("Student not found with ID:", studentId);
      return res.status(404).json({ message: "Student not found" });
    }

    res
      .status(200)
      .json({ message: "Classroom assigned successfully", student });
  } catch (error) {
    console.error("Failed to assign classroom:", error);
    res.status(500).json({ message: "Failed to assign classroom", error });
  }
};
