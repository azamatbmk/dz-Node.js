import { Request, Response, NextFunction } from "express";
import { IMiddleware } from "./middlewares.interface";
import { verify } from "jsonwebtoken";

export class AuthMiddleware implements IMiddleware {
    constructor( private secret: string) {}

    execute(req: Request, res: Response, next: NextFunction): void {
        if(req.headers.authorization) {
            verify(req.headers.authorization.split(' ')[1], this.secret, (err, payload) => {
                if(err) {
                    next()
                } else if (payload) {
                    req.admin = payload as string;
                    next();
                }
            })
        } else {
            next();
        }
    };
    
}