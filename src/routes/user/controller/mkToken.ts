import { Request } from "express";
import jwt from "jsonwebtoken";

const mkAccess = async (req: Request, user: object): Promise<string> => {
    const secret = req.app.get('jwt-secret');
    const token: string = await jwt.sign({
        id: user['id'],
        username: user['username']
    }, secret, {
        expiresIn: '30m'
    });
    return token;
}

const mkRefresh = async (req: Request, user: object): Promise<string> => {
    const secret = req.app.get('refresh-secret');
    const token: string = await jwt.sign({
        id: user['id'],
        username: user['username'],
        refresh: true
    }, secret, {
        expiresIn: '30m'
    });
    return token;
}

export { mkAccess, mkRefresh };