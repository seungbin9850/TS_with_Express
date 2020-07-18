import { sequelize } from "../config/config";
import Sequelize, { Model } from "sequelize";

export class User extends Model {
    name: string;
    username: string;
    password: string;
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
        }
    }, {
        sequelize,
        modelName: "User"
    }
)