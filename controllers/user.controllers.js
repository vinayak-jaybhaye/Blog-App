import User from '../models/user.model.js'
import { validateToken, createToken } from '../utils/authenttication.js'

const userSignin = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(req.body)

        if (!email || !password) {
            console.log("All fields are mandatory");
            return res.status(400).json({ message: "All fields are mandatory" });
        }
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            console.log("User doesn't exist");
            return res.status(409).json({ message: "User doesn't exist" });
        }

        if (!existingUser.matchPassword(password)) {
            console.log("password incorrect")
            return res.render("signin", {
                error: "Incorrect email or password"
            })
        }
        const token = createToken(existingUser)

        // console.log("User sign in successful:", existingUser , token);
        return res.status(201).cookie('token', token).redirect('/')

    } catch (error) {
        console.error("Something went wrong while signing in:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const userSignup = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        console.log(req.body)

        // Check if all fields are provided
        if (!username || !password || !email) {
            console.log("All fields are mandatory");
            return res.status(400).json({ message: "All fields are mandatory" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("User already exists");
            return res.status(409).json({ message: "User already exists" });
        }

        // Create the user
        const user = await User.create({ username, password, email });

        // Successful signup
        console.log("User created successfully:", user);
        const token = createToken(user)

        return res.status(201).cookie('token', token).redirect('/')

    } catch (error) {
        // Log and handle errors
        console.error("Something went wrong while signing up:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const userLogout = (req, res) => {
    res.clearCookie('token').redirect('/')
}

export { userSignin, userSignup, userLogout }