import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token: any = req.headers["access-token"];
    if (!token) res.status(403).json({ message: "로그인 되어있지 않음" });
    await jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
        if (err) throw new Error("에러");
        req["decoded"] = decoded;
        next();
    })
}

export { authMiddleware }