import { Router } from "express";
import isLoggedIn from "../middlewares/auth";
import CategoryController from "../controllers/category";
import validate, { ValidateMethod } from "../middlewares/validate";

const router = Router();

router.get("/", CategoryController.index);
router.get(
  "/:id",
  validate(CategoryController.validate(ValidateMethod.ID)),
  CategoryController.show
);
router.get(
  "/slug/:slug",
  validate(CategoryController.validate(ValidateMethod.SLUG)),
  CategoryController.slug
);
router.post(
  "/",
  isLoggedIn(),
  validate(CategoryController.validate(ValidateMethod.CREATE)),
  CategoryController.store
);
router.put(
  "/:id",
  isLoggedIn(),
  validate(CategoryController.validate(ValidateMethod.UPDATE)),
  CategoryController.update
);
router.delete(
  "/:id",
  isLoggedIn(),
  validate(CategoryController.validate(ValidateMethod.ID)),
  CategoryController.delete
);

export default router;
