import { Request, Response, NextFunction } from "express";
import * as query from "./query";

export const write = async (req: Request, res: Response, next: NextFunction) => {
    const { title, content } = req.body;
    const file = req.file["key"];
    const token: any = req.headers["access-token"];
    const user: any = await query.findUserByToken(token);
    const id: string = await query.mkid();
    if (!user) throw new Error("존재하지 않는 유저");
    await query.create(id, title, content, user.id, file);
    res.status(200).json({ message: "성공" });
}

export const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const userId = req["decoded"].id;
    const post: any = await query.findOne(id);
    if (userId !== post.userId) throw new Error("자신의 글이 아님")
    await query.deleteOnePost(id);
    res.status(200).json({ message: "성공" });
}

export const updateOne = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const { title, content } = req.body;
    const file = req.file["key"];
    const userId = req["decoded"].id;
    const post: any = await query.findOne(id);
    if (userId !== post.userId) throw new Error("자신의 글이 아님");
    await query.updateOnePost(post, title, content, file);
    res.status(200).json({ message: "성공" });
}

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const post: any = await query.findOne(id);
    if (!post) throw new Error("존재하지 않는 글");
    res.status(200).json({
        message: "성공",
        post
    });
}

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    const post: any = await query.findAll();
    if (!post) throw new Error("존재하지 않는 글");
    res.status(200).json({
        message: "성공",
        post
    });
}