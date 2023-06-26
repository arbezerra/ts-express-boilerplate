import { Router } from "express";
import isLoggedIn from "../middlewares/auth";
import CategoryController from "../controllers/category";

const router = Router();

router.get(
  "/",
  CategoryController.index
);
router.get(
  "/:id",
  CategoryController.show
);
router.get(
  "/slug/:slug",
  CategoryController.slug
);
router.post(
  "/",
  isLoggedIn(),
  CategoryController.store
);
router.put(
  "/:id",
  isLoggedIn(),
  CategoryController.update
);
router.delete(
  "/:id",
  isLoggedIn(),
  CategoryController.delete
);

export default router;
