import { Request, Response, NextFunction } from "express";

interface handlerFunc {
    (req: Request, res: Response, next: NextFunction): void;
}

export class tryCatchMiddleware {
    static NotFound = (cb: handlerFunc) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                await cb(req, res, next);
            } catch (e) {
                res.status(404).json({
                    message: e.message
                })
            }
        }
    }
    static Conflict = (cb: handlerFunc) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                await cb(req, res, next);
            } catch (e) {
                res.status(409).json({
                    message: e.message
                })
            }
        }
    }
    static ServerError = (cb: handlerFunc) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                await cb(req, res, next);
            } catch (e) {
                res.status(500).json({
                    message: e.message
                })
            }
        }
    }
}