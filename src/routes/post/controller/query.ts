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

const compareUser = async (username: string, postUsername: string): Promise<boolean> => {
    return username === postUsername;
}

const findOne = async (id: string): Promise<Post> => {
    const post: any = await Post.findOne({ where: { id } });
    return post;
}

const deleteOnePost = async (id: string) => {
    try {
        const post: any = await findOne(id);
        await post.destroy();
    } catch (e) {
        throw new Error("존재하지 않는 글");
    }
}

export { create, findUserByToken, deleteOnePost, compareUser, findOne }