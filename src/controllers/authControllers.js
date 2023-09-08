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
            { expiresIn: "1h" }
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

}

const logout = async (req, res) => {

}


export default { register, login, logout } 