import express from "express";
import * as User from "./controller/user.controller";
import { tryCatchMiddleware } from "../../middlewares/try-catch";
import { authMiddleware, refreshMiddleware } from "../../middlewares/auth";

const router = express.Router();

router.post('/register', tryCatchMiddleware.Conflict(User.signUp));
router.post('/login', tryCatchMiddleware.NotFound(User.login));
router.get('/refresh', refreshMiddleware, tryCatchMiddleware.NotFound(User.refresh));
router.put('/change', authMiddleware, tryCatchMiddleware.NotFound(User.changePassword));

export default router;