import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import itemRouter from "./routes/itemRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import favRouter from "./routes/favRoute.js"
import orderRouter from "./routes/orderRoute.js"


//app config

const app = express()
const port = 4000

// middleware

app.use(express.json())
app.use(cors())

//db connection
connectDB();


//api endpoints
app.use("/api/item",itemRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/fav",favRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

