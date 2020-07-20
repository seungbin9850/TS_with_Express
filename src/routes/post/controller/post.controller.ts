import { Request, Response, NextFunction } from "express";
import * as query from "./query";

export const write = async (req: Request, res: Response, next: NextFunction) => {
    const { title, content } = req.body;
    const token: any = req.headers["access-token"];
    const user: any = await query.findUserByToken(token)
    const id: any = await query.mkid();
    if (!user) throw new Error("존재하지 않는 유저");
    await query.create(id, title, content, user.username);
    res.status(200).json({ message: "성공" });
}

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const username = req["decoded"].username;
    const post: any = await query.findOne(id);
    if (!post) throw new Error("존재하지 않는 글");
    if (username !== post.username) throw new Error("자신의 글이 아님")
    await query.deleteOnePost(id);
    res.status(200).json({ message: "성공" });
}