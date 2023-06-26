import { Router } from "express";
import isLoggedIn from "../middlewares/auth";
import PostController from "../controllers/post";

const router = Router();

router.get(
  "/",
  PostController.index
);
router.get(
  "/:id",
  PostController.show
);
router.get(
  "/slug/:slug",
  PostController.slug
);
router.post(
  "/",
  isLoggedIn(),
  PostController.store
);
router.put(
  "/:id",
  isLoggedIn(),
  PostController.update
);
router.delete(
  "/:id",
  isLoggedIn(),
  PostController.delete
);

export default router;
