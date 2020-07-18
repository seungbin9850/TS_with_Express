import express from "express";
import { signUp, login } from "./controller/user.controller";
import { tryCatchMiddleware } from "../../middlewares/try-catch";

const router = express.Router();

router.post('/register', tryCatchMiddleware.Conflict(signUp));
router.post('/login', tryCatchMiddleware.NotFound(login));

export default router;