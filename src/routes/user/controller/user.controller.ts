import { Request, Response, NextFunction } from "express";
import { findOneByUsername, createUser, passwordCompare, passwordHashing, findOneByRefresh } from "./query";
import { mkAccess, mkRefresh } from "./mkToken";


export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const { name, username, password } = req.body;
    const hashedPassword = await passwordHashing(password);
    if (await findOneByUsername(username)) throw new Error("이미 있는 아이디");
    await createUser(name, username, hashedPassword);
    res.status(200).json({ message: "회원가입 성공" });
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const user = await findOneByUsername(username);

    if (!user) throw new Error("아이디 혹은 비밀번호가 틀림");
    if (!await passwordCompare(password, user.password)) throw new Error("아이디 혹은 비밀번호가 틀림");
    const accessToken = await mkAccess(req, user);
    const refreshToken = await mkRefresh(req, user);
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    user.save();
    res.status(200).json({
        message: "로그인 성공",
        accessToken,
        refreshToken
    });
}

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
    const refresh: any = req.headers["refresh-token"]
    const user: any = await findOneByRefresh(refresh);
    const accessToken = await mkAccess(req, user);
    user.accessToken = accessToken;
    user.save();
    res.status(200).json({
        message: "성공",
        accessToken
    })
}