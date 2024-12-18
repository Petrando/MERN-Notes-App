import app from "./app";
import env from "./util/validateEnv"
import mongoose from "mongoose"

const port = env.PORT || 5000

const URI = env.MONGO_CONNECTION_STRING || "";

mongoose.connect(URI, { dbName: "cool_notes_app",})
    .then(()=>{
        console.log("connected to MongoDB")
        app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })
    })
    .catch(console.error)