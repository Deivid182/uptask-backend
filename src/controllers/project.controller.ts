import type { Response, Request } from "express";
import Project from "../models/Project";

type Project = {
  projectName: string
  clientName: string
  description: string
}

type ParamsId = {
  id: string
}

export class ProjectController {
  static async createProject(req: Request<unknown, unknown, Project>, res: Response) {
    const project = new Project(req.body);
    try {
      await project.save();
      res
        .status(201)
        .json({
          msg: "Project created successfully",
          data: project,
          success: true,
        });
    } catch (error) {
      console.log(error, "Error creating a new project");
      res.status(500).json({
        msg: "Internal Server Error",
        success: false,
        data: null,
      });
    }
  }
  static async getAll(req: Request, res: Response) {
    try {
      const projects = await Project.find({});
      return res.json({
        msg: "Projects retrieved successfully",
        data: projects,
        success: true,
      });
    } catch (error) {
      console.log(error, "Error getting all projects");
      res.status(500).json({
        msg: "Internal Server Error",
        success: false,
        data: null,
      });
    }
  }

  static async getProjectById(req: Request<ParamsId, unknown, unknown>, res: Response) {
    try {
      const projectFound = await Project.findById(req.params.id).populate('tasks')
      if(!projectFound) {
        return res.status(404).json({
          msg: "Project not found",
          success: true,
          data: null,
        })
      }
      res.status(200).json({
        msg: "Project retrieved successfully",
        success: true,
        data: projectFound,
      })
    } catch (error) {
      console.log(error, "Error getting one project");
      res.status(500).json({
        msg:  "Internal Server Error",
        success: false,
        data: null,
      });
    }
  }

  static async updateProject(req: Request<ParamsId, unknown, Project>, res: Response) {
    try {
      const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
       if(!project) {
        return res.status(404).json({
          msg: "Project not found",
          success: true,
          data: null,
        })
      }
      res.status(200).json({
        msg: "Project updated successfully",
        success: true,
        data: project,
      })
    } catch (error) {
      console.log(error, "Error updating project");
      res.status(500).json({
        msg: "Internal Server Error",
        success: false,
        data: null,
      });
    }
  }

  static async deleteProject(req: Request<ParamsId>, res: Response) {
    try {
      const projectDeleted = await Project.findByIdAndDelete(req.params.id)
      if(!projectDeleted) {
        return res.status(404).json({
          msg: "Project not found",
          success: true,
          data: null,
        })
      }
      res.status(200).json({
        msg: "Project deleted successfully",
        success: true,
        data: null,
      })
    } catch (error) {
      console.log(error, "Error deleting project");
      res.status(500).json({
        msg: "Internal Server Error",
        success: false,
        data: null,
      });
    }
  }

}


