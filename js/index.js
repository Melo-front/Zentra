const dotenv = require('dotenv')
const express = require('express')
const app=express()
const connectDB =require('../config/db');
const auth=require("../routes/auth.routes");
const task=require("../routes/task.routes")
const product=require("../routes/products.routes");
const cors=require("cors")
const path = require("path");

dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "..")));

app.use('/api/auth',auth)
app.use('/api/task',task)
app.use('/api/product',product)
app.use("/public/images", express.static(path.join(__dirname, "../public/images")));



const PORT=process.env.PORT;

app.listen(PORT, ()=>{
    console.log("Conectamos a express:" + PORT)
})

