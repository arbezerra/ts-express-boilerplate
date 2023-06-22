import {Router} from "express";
import AuthController from "../controllers/auth";

const router = Router();

router.get("/", AuthController.index);
router.post("/", AuthController.login);

export default router;