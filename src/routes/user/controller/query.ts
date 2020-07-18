import { User } from "../../../models/user";
import bcrypt from "bcrypt-nodejs";

const passwordHashing = async (password: string): Promise<string> => {
    return bcrypt.hashSync(password);
}

const passwordCompare = async (password: string, real: string): Promise<boolean> => {
    return await bcrypt.compareSync(password, real);
}

const findOne = async (username: string): Promise<User> => {
    const user: any = await User.findOne({ where: { username } });
    return user;
}

const findOneByUsername = async (username: string): Promise<User> => {
    try {
        const user: any = await findOne(username);
        return user;
    } catch (e) {
        throw e;
    }
}

const createUser = async (name: string, username: string, password: string) => {
    await User.create({
        name,
        username,
        password
    })
}

export { findOneByUsername, createUser, passwordHashing, passwordCompare };