import { Request, Response, NextFunction } from "express";
import * as query from "./query";
import { mkAccess, mkRefresh } from "./mkToken";


export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const { name, username, password } = req.body;
    const hashedPassword = await query.passwordHashing(password);
    const id: string = await query.mkid();
    if (await query.findOne(username)) throw new Error("이미 있는 아이디");
    await query.createUser(id, name, username, hashedPassword);
    res.status(200).json({ message: "회원가입 성공" });
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const user = await query.findOne(username);
    if (!user) throw new Error("아이디 혹은 비밀번호가 틀림");
    if (!await query.passwordCompare(password, user.password)) throw new Error("아이디 혹은 비밀번호가 틀림");
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
    const user: any = await query.findOneByRefresh(refresh);
    const accessToken = await mkAccess(req, user);
    user.accessToken = accessToken;
    user.save();
    res.status(200).json({
        message: "성공",
        accessToken
    })
}

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
    const username = req["decoded"].username;
    const password = req.body.password; 
    await query.change(username, await query.passwordHashing(password));
    res.status(200).json({
        message: "성공"
    })
}

export const secessionUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = await query.findOne(req['decoded'].username);
    await user.destroy();
    res.status(200).json({ message: "성공" });
}