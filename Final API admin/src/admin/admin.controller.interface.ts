import { NextFunction, Request, Response } from "express";

export interface IAdminController {
    login: (req: Request, res: Response, next: NextFunction) => void; 
    
    register: (req: Request, res: Response, next: NextFunction) => void;
}