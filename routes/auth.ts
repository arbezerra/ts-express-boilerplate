import passport from "passport";
import { Router } from "express";
import AuthController from "../controllers/auth";

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  AuthController.index
);
router.post("/", AuthController.login);

export default router;
