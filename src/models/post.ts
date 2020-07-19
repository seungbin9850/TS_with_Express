import { sequelize } from "../config/config";
import Sequelize, { Model } from "sequelize";

export class Post extends Model {
    title: string;
    content: string;
}

Post.init (
    {
        title: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.STRING,
        }
    }, {
        sequelize,
        modelName: "Post",
    }
);