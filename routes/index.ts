import {Router} from "express";
import authRouter from "./auth";
import categoryRouter from "./category";
import postRouter from "./post";

const router = Router();

router.use("/auth", authRouter);
router.use("/category", categoryRouter);
router.use("/post", postRouter);

export default router;