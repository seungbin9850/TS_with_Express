import express from "express";
import { tryCatchMiddleware } from "../../middlewares/try-catch";
import * as auth from "../../middlewares/auth";
import * as post  from "./controller/post.controller";

const router = express.Router();
const accessToken = auth.authMiddleware;

router.post('/', accessToken, tryCatchMiddleware.NotFound(post.write));
router.delete('/:id', accessToken, tryCatchMiddleware.NotFound(post.deleteOne));
router.put('/:id', accessToken, tryCatchMiddleware.NotFound(post.updateOne));
router.get('/', tryCatchMiddleware.NotFound(post.getAll));
router.get('/:id', tryCatchMiddleware.NotFound(post.getOne));

export default router;