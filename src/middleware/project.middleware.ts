import type { Request, Response, NextFunction } from "express";
import Project, { ProjectType } from "../models/Project";

declare global {
  namespace Express {
    interface Request {
      project: ProjectType
    }
  }
}

export async function validateProjectExists(req: Request, res: Response, next: NextFunction) {
  try {
    const projectFound = await Project.findById(req.params.projectId)
    if(!projectFound) {
      return res.status(404).json({
        msg: "Project not found",
        success: true,
        data: null,
      })
    }
    req.project = projectFound
    next()
  } catch (error) {
    res.status(500).json({
      msg: 'Something went wrong',
      success: false,
      data: null
    })
  }
}