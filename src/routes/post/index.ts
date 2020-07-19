import express from "express";
import { tryCatchMiddleware } from "../../middlewares/try-catch";
import * as auth from "../../middlewares/auth";
import { write } from "./controller/post.controller";

const router = express.Router();
const accessToken = auth.authMiddleware;

router.post('/', accessToken, tryCatchMiddleware.NotFound(write));

export default router;