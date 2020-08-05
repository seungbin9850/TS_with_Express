import { Post } from "../../../models/post";
import { User } from "../../../models/user";
import uuid4 from "uuid4";
import aws from "aws-sdk";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(__dirname, '../../.env') });

const s3 = new aws.S3({
    accessKeyId: process.env.S3_ACCESS,
    secretAccessKey: process.env.S3_SECRET,
    region: "ap-northeast-2"
});

export const mkid = async (): Promise<string> => {
    const id = await uuid4().split("-");
    return id[2] + id[1] + id[0] + id[3] + id[4]
} 

export const create = async (id: string, title: string, content: string, userId: string, file: string) => {
    return await Post.create({ 
        id,
        title, 
        content, 
        userId,
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
    const post: any = await Post.findAll({ attributes: ["id", "title"] });
    return post;
}

const deleteS3 = async (post: any) => {
    const params = {
        Bucket: process.env.S3_NAME || "",
        Key: post.file,
    }
    await s3.deleteObject(params, (err, data) => {
        if (err) throw new Error(err.message);
    })
}

export const updateOnePost = async (post: any, title: string, content: string, file: string) => {
    try {
        await deleteS3(post);
        post.title = title;
        post.content = content;
        post.file = file;
        await post.save();
    } catch (e) {
        throw e;
    }
}

export const deleteOnePost = async (post: any) => {
    try {
        await deleteS3(post);
        await post.destroy();
    } catch (e) {
        throw e;
    }
}