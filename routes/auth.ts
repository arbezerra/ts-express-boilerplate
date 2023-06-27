import { Router } from "express";
import AuthController from "../controllers/auth";
import isLoggedIn from "../middlewares/auth";
import validate, { ValidateMethod } from "../middlewares/validate";

const router = Router();

router.get("/", isLoggedIn(), AuthController.index);
router.post(
  "/",
  validate(AuthController.validate(ValidateMethod.LOGIN)),
  AuthController.login
);
router.put(
  "/",
  validate(AuthController.validate(ValidateMethod.CREATE)),
  AuthController.register
);

export default router;
