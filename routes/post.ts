import { Router } from "express";
import isLoggedIn from "../middlewares/auth";
import PostController from "../controllers/post";
import validate, { ValidateMethod } from "../middlewares/validate";

const router = Router();

router.get(
  "/",
  validate(PostController.validate(ValidateMethod.PAGINATE)),
  PostController.index
);
router.get(
  "/:id",
  validate(PostController.validate(ValidateMethod.ID)),
  PostController.show
);
router.get(
  "/slug/:slug",
  validate(PostController.validate(ValidateMethod.SLUG)),
  PostController.slug
);
router.post(
  "/",
  isLoggedIn(),
  validate(PostController.validate(ValidateMethod.CREATE)),
  PostController.store
);
router.put(
  "/:id",
  isLoggedIn(),
  validate(PostController.validate(ValidateMethod.UPDATE)),
  PostController.update
);
router.delete(
  "/:id",
  isLoggedIn(),
  validate(PostController.validate(ValidateMethod.ID)),
  PostController.delete
);

export default router;
