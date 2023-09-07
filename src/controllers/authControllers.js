import User from "../models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                message: "user already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        await newUser.save()

        res.status(201).json({ message: "user registered sucessfully" })

    }catch(error){
        console.log(error);
        res.status(500).json({message:"InternAL server error"})
    }


}

const login = async (req, res) => {

}

const logout = async (req, res) => {

}


export default { register, login, logout } 