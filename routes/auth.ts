import passport from "passport";
import { Router } from "express";
import AuthController from "../controllers/auth";
import isLoggedIn from "../middlewares/auth";

const router = Router();

router.get(
  "/",
  isLoggedIn(),
  AuthController.index
);
router.post("/", AuthController.login);
router.put("/", AuthController.register);

export default router;
