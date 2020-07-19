import { Post } from "../../../models/post";
import { User } from "../../../models/user";

const create = async (title: string, content: string, username: string) => {
    return await Post.create({ 
        title, 
        content, 
        username 
    });
}

const findUserByToken = async (accessToken: string): Promise<User> => {
    const user: any = await User.findOne({ where: { accessToken } });
    return user;
}

export { create, findUserByToken }