import { sequelize } from "../config/config";
import Sequelize, { Model } from "sequelize";
import { Post } from "./post";

export class User extends Model {
    name: string;
    username: string;
    password: string;
    accessToken: string;
    refreshToken: string;
}

User.init (
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        accessToken: {
            type: Sequelize.STRING,
        },
        refreshToken: {
            type: Sequelize.STRING,
        }
    }, {
        sequelize,
        modelName: "User"
    }
);

User.hasMany(Post, { foreignKey: "username", sourceKey: "username" });
Post.belongsTo(User, { foreignKey: "username" });