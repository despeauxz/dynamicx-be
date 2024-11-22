import { Router } from "express";
import * as CommonMiddleware from "../middlewares/common.middleware";
import { validateData } from "../middlewares/validation.middleware";
import * as taskValidator from "../utils/validate/task.validate";
import { TaskController } from "../controllers";

export const taskRouter = Router();

taskRouter.post(
  "/",
  validateData(taskValidator.taskValidator),
  CommonMiddleware.authenticateToken,
  TaskController.addTask
);

taskRouter.get(
  "/",
  CommonMiddleware.authenticateToken,
  TaskController.listAllTasks
);

taskRouter.post(
  "/:id",
  CommonMiddleware.authenticateToken,
  TaskController.toggleTaskCompletion
);

taskRouter.patch(
  "/:id",
  CommonMiddleware.authenticateToken,
  TaskController.handleUppate
);

taskRouter.delete(
  "/:id",
  CommonMiddleware.authenticateToken,
  TaskController.handleDelete
);

