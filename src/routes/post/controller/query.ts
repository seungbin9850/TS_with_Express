import { Post } from "../../../models/post";
import { User } from "../../../models/user";
import uuid4 from "uuid4";

export const mkid = async (): Promise<string> => {
    const id = await uuid4().split("-");
    return id[2] + id[1] + id[0] + id[3] + id[4]
} 

export const create = async (id: string, title: string, content: string, username: string, file: string) => {
    return await Post.create({ 
        id,
        title, 
        content, 
        username,
        file
    });
}

export const findUserByToken = async (accessToken: string): Promise<User> => {
    const user: any = await User.findOne({ where: { accessToken } });
    return user;
}

export const findOne = async (id: string): Promise<Post> => {
    const post: any = await Post.findOne({ where: { id } });
    return post;
}

export const findAll = async (): Promise<Post> => {
    const post: any = await Post.findAll();
    return post;
}

export const deleteOnePost = async (id: string) => {
    try {
        const post: any = await findOne(id);
        await post.destroy();
    } catch (e) {
        throw new Error("존재하지 않는 글");
    }
}