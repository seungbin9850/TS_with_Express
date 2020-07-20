import { Request, Response, NextFunction } from "express";
import { create, findUserByToken, deleteOnePost, compareUser, findOne } from "./query";

const write = async (req: Request, res: Response, next: NextFunction) => {
    const { title, content } = req.body;
    const token: any = req.headers["access-token"];
    const user: any = await findUserByToken(token)
    if (!user) throw new Error("존재하지 않는 유저");
    await create(title, content, user.username);
    res.status(200).json({ message: "성공" });
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const username = req["decoded"].username;
    const post: any = await findOne(id);
    if (!post) throw new Error("존재하지 않는 글");
    if (!compareUser(username, post.username)) {
        res.status(403).json({ message: "자신의 글이 아님" });
    }
    await deleteOnePost(id);
    res.status(200).json({ message: "성공" });
}

export { write, deleteOne };