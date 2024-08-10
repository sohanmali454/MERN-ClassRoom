import Student from "../models/student.model.js";

export const test = (req, res) => {
    res.json({ message: "API is Working" });
};

export const signIn = async(req, res) => {
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

export const signUp = async(req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await Student.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const newUser = new Student({
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