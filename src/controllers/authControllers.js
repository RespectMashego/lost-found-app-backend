import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const register = async (req, res) => {
  const port = 3000;
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("user email exists");
      return res.status(400).json({
        message: "user email already exists",
      });
    }
    const confirmationToken = Math.random().toString(36).substring(2, 15);

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      email,
      confirmationToken,
      isConfirmed: false,
      password: hashedPassword,
    });

    await newUser.save();
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "r.mashego333@gmail.com", // Replace with your Gmail email address
        pass: "xihv ojpg jksv iazi", // Replace with your Gmail password
      },
    });

    const mailOptions = {
      from: "r.mashego333@gmail.com",
      to: email,
      subject: "Email Confirmation for Lost and Found App",
      text: `Click the following link to confirm your email: http://192.168.190.44:${port}/auth/confirm-email/${confirmationToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).json({
      message: "Registration successful. Check your email for confirmation.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "InternAL server error" });
  }
};

export const emailConfirmation = async (req, res) => {
  const {confirmationToken } = req.params;
  console.log(confirmationToken);

  try {
    const user = await User.findOne({ confirmationToken });

    if (!user) {
      console.log("Token not found");
      return res.status(404).send("Token not found.");
    }

    // Update user's confirmation status
    user.isConfirmed = true;
    user.confirmationToken = null;
    await user.save();

    res.send("Email confirmed successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user with the provided email in the database.
    const existingUser = await User.findOne({ email });

    //Check if a user with the provided email exists.
    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }
    // Compare the provided password with the hashed password stored in the database.
    const isPasswordValid = bcrypt.compare(password, existingUser.password);
    //If the password is invalid, return an error.

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Check if the user's email is confirmed
    if (!existingUser.isConfirmed) {
      return res.status(401).json({
        message: "Email not confirmed. Please confirm your email first.",
      });
    }
    //If the password is valid, generate a new JWT token for the user.
    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
        username: existingUser.username,
      },
      "respecttaelo"
    );
    res.status(200).json({
      message: "Login sucessful",
      user: existingUser,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "internal sever error",
    });
  }
};

const forgotPasswordChange = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        const encyptedPassword=bcrypt.hash()
        
    }
  } catch (error) {}
};

const logout = async (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};

export default { register, login, logout, emailConfirmation,forgotPasswordChange };
