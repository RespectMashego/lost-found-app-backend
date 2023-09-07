import express from "express";
import dotenv from "dotenv"
import morgan from "morgan";
import mongoose from "mongoose";

dotenv.config();

console.log(process.env.MONGOBD_URI);


const app = express()

//middleware setup
app.use(express.json())
app.use(morgan('dev'))

mongoose.connect(process.env.MONGOBD_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("monogdb connected")).catch((e) => console.log("failed to connect mongodb",e))
//Routes
import authRoutes from "./src/routes/authRoutes.js"

app.use("/auth",authRoutes)

const PORT=process.env.PORT  || 3000

app.listen(PORT, () => {
    console.log("sever listening to port 3000");

})

app.get('/', (req, res) => {
    res.send("hello world")
})




