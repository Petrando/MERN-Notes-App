/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "dotenv/config"
import mongoose from "mongoose"
import express from "express"

const app = express()
const port = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.send("Hello, World")
})

const URI = process.env.MONGO_CONNECTION_STRING || "";

mongoose.connect(URI, { dbName: "messages",})
    .then(()=>{
        console.log("connected to MongoDB")
        app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })
    })
    .catch(console.error)