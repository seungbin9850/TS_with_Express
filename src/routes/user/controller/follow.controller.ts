import { Request, Response, NextFunction } from "express";
import * as query from "./query";

export const Follow = (req: Request, res: Response, next: NextFunction) => {
  const followerId = req["decoded"].id;
  const followingId = req.params.id;
  query.Following(followerId, followingId);
  res.status(200).json({ message: "성공" });
};
