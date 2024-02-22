import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
dotenv.config();



const app=express();
app.use(express.json());
app.use("/user",userRouter );
app.use("/admin",adminRouter);

mongoose.connect(
    `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.odhwbgg.mongodb.net/?retryWrites=true&w=majority`
    ).then(()=>app.listen(5000,()=>
console.log("Connected To DataBase & Server is running")
)
)
.catch(e=>console.log(e));

