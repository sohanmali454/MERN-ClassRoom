import Teacher from "../models/teacher.model.js";

export const test = (req, res) => {
  res.json({ message: "API is Working" });
};

//Sign In

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const validUser = await Teacher.findOne({ email: email });

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

//New Teacher

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await Teacher.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const newUser = new Teacher({
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

//Get All Teacher

export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    return res.status(200).json({ teachers: teachers });
  } catch (error) {
    console.error("Error fetching teachers:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

//Update Teacher By Id
export const updateTeacher = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true, runValidators: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found!" });
    }

    return res.status(200).json({
      message: "Teacher updated successfully!",
      teacher: updatedTeacher,
    });
  } catch (error) {
    console.error("Error updating teacher:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

//Delete Teacher by id

export const deleteTeacher = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(id);

    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found!" });
    }

    return res.status(200).json({ message: "Teacher deleted successfully!" });
  } catch (error) {
    console.error("Error deleting teacher:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
