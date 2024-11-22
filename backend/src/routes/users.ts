import express from "express";
import * as UserController from "../controllers/users";

const router = express.Router();

//router.get("/", requiresAuth, UserController.getAuthenticatedUser);

router.post("/signup", UserController.signUp);

export default router