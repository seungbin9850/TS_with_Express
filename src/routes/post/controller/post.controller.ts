import { Request, Response, NextFunction } from "express";
import { create, findUserByToken } from "./query";

const write = async (req: Request, res: Response, next: NextFunction) => {
    const { title, content } = req.body;
    const token: any = req.headers["access-token"];
    const user: any = await findUserByToken(token)
    if (!user) throw new Error("존재하지 않는 유저");
    await create(title, content, user.username);
    res.status(200).json({ message: "성공" });
}

export { write };