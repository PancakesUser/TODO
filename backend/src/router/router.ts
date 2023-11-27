import express, { Router } from "express"
import { authRoutes } from "./authRoutes/discord"
import { userRouter } from "./userRoutes";
import { notesRoutes } from "./notesRoutes";

const router: Router = express.Router()



router.use("/auth", authRoutes);
router.use("/user", userRouter);
router.use("/note", notesRoutes);

export {router as mainRouter}