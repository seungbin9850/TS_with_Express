import { User } from "../../../models/user";
import { Follow } from "../../../models/follow";
import bcrypt from "bcrypt-nodejs";
import uuid4 from "uuid4";

export const mkid = async (): Promise<string> => {
  const id = await uuid4().split("-");
  return id[2] + id[1] + id[0] + id[3] + id[4];
};

export const passwordHashing = async (password: string): Promise<string> => {
  return bcrypt.hashSync(password);
};

export const passwordCompare = async (
  password: string,
  real: string
): Promise<boolean> => {
  return await bcrypt.compareSync(password, real);
};

export const findOne = async (username: string): Promise<User> => {
  try {
    const user: any = await User.findOne({ where: { username } });
    return user;
  } catch (e) {
    throw e;
  }
};

export const findOneById = async (id: string): Promise<User> => {
  try {
    const user: any = await User.findOne({ where: { id } });
    return user;
  } catch (e) {
    throw e;
  }
};

export const createUser = async (
  id: string,
  name: string,
  username: string,
  password: string
) => {
  await User.create({
    id,
    name,
    username,
    password,
  });
};

export const findOneByRefresh = async (refreshToken: string): Promise<User> => {
  try {
    const user: any = await User.findOne({ where: { refreshToken } });
    return user;
  } catch (e) {
    throw e;
  }
};

export const change = async (username: string, password: string) => {
  try {
    const user: any = await findOne(username);
    user.password = password;
    user.save();
  } catch (e) {
    throw e;
  }
};

export const Following = async (followerId: string, followingId: string) => {
  await Follow.create({ followerId, followingId });
};
