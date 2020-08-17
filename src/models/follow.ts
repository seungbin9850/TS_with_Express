import { sequelize } from "../config/config";
import Sequelize, { Model } from "sequelize";

export class Follow extends Model {
  followerId: string;
  followingId: string;
}

Follow.init(
  {
    followerId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    followingId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Follow",
  }
);
