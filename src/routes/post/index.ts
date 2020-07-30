import express from "express";
import { tryCatchMiddleware } from "../../middlewares/try-catch";
import { uploadMiddleware } from "../../middlewares/upload";
import * as auth from "../../middlewares/auth";
import * as post  from "./controller/post.controller";

const router = express.Router();
const accessToken = auth.authMiddleware;

router.post('/', accessToken, uploadMiddleware.single('file'), tryCatchMiddleware.NotFound(post.write));
router.delete('/:id', accessToken, tryCatchMiddleware.NotFound(post.deleteOne));
router.put('/:id', accessToken, uploadMiddleware.single('file'), tryCatchMiddleware.NotFound(post.updateOne));
router.get('/', tryCatchMiddleware.NotFound(post.getAll));
router.get('/:id', tryCatchMiddleware.NotFound(post.getOne));

export default router;