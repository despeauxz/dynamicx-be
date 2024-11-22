import { authRouter } from "./auth.route";
import { taskRouter } from "./task.route";
import { Router } from "express";

export const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/tasks", taskRouter);
