import express from "express";
import dotenv from "dotenv"
import morgan from "morgan";
import mongoose from "mongoose";
import { v2 as cloudinary } from 'cloudinary';



dotenv.config();

console.log(process.env.MONGOBD_URI);


const app = express()

//cloudinar

cloudinary.config({
    cloud_name: 'dhge4f7mf',
    api_key: '214534517966234',
    api_secret: 'dZxbcDvVTf4u314F44qc4PtzUOg'
});

//middleware setup
app.use(express.json())
app.use(morgan('dev'))

mongoose.connect(process.env.MONGOBD_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("monogdb connected")).catch((e) => console.log("failed to connect mongodb", e))
//Routes
import authRoutes from "./src/routes/authRoutes.js"
import itemRoutes from "./src/routes/itemRoutes.js"
import feedRoutes from './src/routes/feedRoutes.js';

app.use('/api', itemRoutes);
app.use("/auth", authRoutes)
app.use('/api/feed', feedRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("sever listening to port 3000");

})

app.get('/', (req, res) => {
    res.send("hello world")
})




