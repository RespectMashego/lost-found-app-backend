import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email })


        if (existingUser) {
            console.log("user email exists");
            return res.status(400).json({
                message: "user email already exists"
            })

        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        await newUser.save()
        const token = jwt.sign({
            userId: newUser._id, email: newUser.email, username: newUser.username,
        }, 'respecttaelo',
            // { expiresIn: "1h" }
        )
        res.status(201).json({
            message: "User registered successfully",
            user: newUser,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "InternAL server error" })
    }


}

const login = async (req, res) => {

    try {
        const { email, password } = req.body
        // Find the user with the provided email in the database.
        const existingUser = await User.findOne({ email })

        //Check if a user with the provided email exists.
        if (!existingUser) {
            return res.status(404).json({ message: "User not found." })
        }
        // Compare the provided password with the hashed password stored in the database.
        const isPasswordValid = bcrypt.compare(password, existingUser.password)
        //If the password is invalid, return an error.

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        //If the password is valid, generate a new JWT token for the user.
        const token = jwt.sign({
            userId: existingUser._id,
            email: existingUser.email,
            username: existingUser.username,
        }, 'respecttaelo',
            { expiresIn: "1h" }
        )
        res.status(200).json({
            message: "Login sucessful",
            user: existingUser,
            token
        })


    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "internal sever error"
        })

    }

}

const logout = async (req, res) => {
    res.status(200).json({ message: "Logout successful" })

}


export default { register, login, logout } 