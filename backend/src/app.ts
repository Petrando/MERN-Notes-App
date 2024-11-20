/* eslint-disable @typescript-eslint/no-unused-vars */
import "dotenv/config"
import express, { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import NotesModel from "./models/note"

const app = express()

app.get("/", (req, res, next) => {
    try{
        throw Error("Yippyy!")
        const notes = NotesModel.find().exec()
        res.status(200).json({notes})
    }catch(err){
        next(err)
    }
    
})

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
    //next(Error("Endpoint not found"))
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    const errorMessage = "An unknown error occurred";
    const statusCode = 500;
    
    /*
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }*/
    res.status(statusCode).json({ error: errorMessage });
});

export default app