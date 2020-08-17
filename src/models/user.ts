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

User.init(
  {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
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
      allowNull: false,
    },
    accessToken: {
      type: Sequelize.STRING,
    },
    refreshToken: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

User.hasMany(Post, { foreignKey: "userId", sourceKey: "username" });
Post.belongsTo(User, { foreignKey: "userId" });
