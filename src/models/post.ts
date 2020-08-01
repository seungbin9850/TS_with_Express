import { sequelize } from "../config/config";
import Sequelize, { Model } from "sequelize";

export class Post extends Model {
    id: string;
    title: string;
    content: string;
}

Post.init (
    {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
        },
        content: {
            type: Sequelize.STRING,
        },
        file: {
            type: Sequelize.STRING,
        }
    }, {
        sequelize,
        modelName: "Post",
    }
);