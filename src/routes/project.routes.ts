import { Router } from "express";
import { ProjectController } from "../controllers/project.controller";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation.middleware";
import { TaskController } from "../controllers/task.controller";
import { validateProjectExists } from "../middleware/project.middleware";
export const router = Router();

router.get("/", ProjectController.getAll);

router.post(
  "/",
  body("projectName").notEmpty().withMessage("Project Name is required"),
  body("clientName").notEmpty().withMessage("Client Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  handleInputErrors,
  ProjectController.createProject
);

router.get(
  "/:id",
  param("id").isMongoId().withMessage("Provide a valid id"),
  handleInputErrors,
  ProjectController.getProjectById
);

router.patch(
  '/:id',
  param("id").isMongoId().withMessage("Provide a valid id"),
  body("projectName").notEmpty().withMessage("Project Name is required"),
  body("clientName").notEmpty().withMessage("Client Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  handleInputErrors,
  ProjectController.updateProject
)

router.delete(
  '/:id',
  param('id').isMongoId().withMessage('Provide a valid id'),
  handleInputErrors,
  ProjectController.deleteProject
)

// Task Routes

router.post(
  '/:projectId/tasks',
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  handleInputErrors,
  validateProjectExists,
  TaskController.addTask
)

router.get(
  '/:projectId/tasks',
  param('projectId').isMongoId().withMessage("Provide a valid project id"),
  handleInputErrors,
  validateProjectExists,
  TaskController.getProjectTasks
)

router.get(
  '/:projectId/tasks/:taskId',
  param('projectId').isMongoId().withMessage("Provide a valid project id"),
  param('taskId').isMongoId().withMessage("Provide a valid task id"),
  handleInputErrors,
  validateProjectExists,
  TaskController.getTaskById
)