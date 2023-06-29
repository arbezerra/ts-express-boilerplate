import { Request, Response } from "express";
import pool from "../lib/db";
import Category from "../models/category";
import { ValidateMethod } from "../middlewares/validate";
import { z } from "zod";
import { v4 as uuid4 } from "uuid";

const CategoryController = {
  index: async (req: Request, res: Response) => {
    const items = await pool<Category>("categories");
    return res.status(200).json(items);
  },
  show: async (req: Request, res: Response) => {
    const item = await pool<Category>("categories")
      .where("id", req.params.id)
      .first();
    return res.status(200).json(item);
  },
  slug: async (req: Request, res: Response) => {
    const item = await pool<Category>("categories")
      .where("slug", req.params.slug)
      .first();
    return res.status(200).json(item);
  },
  store: async (req: Request, res: Response) => {
    req.body.id = uuid4();
    const item = await pool<Category>("categories").insert(req.body, "id");
    return res.status(200).json(item);
  },
  update: async (req: Request, res: Response) => {
    const item = await pool<Category>("categories")
      .where("id", req.params.id)
      .update(req.body);
    return res.status(200).json(item);
  },
  delete: async (req: Request, res: Response) => {
    const item = await pool<Category>("categories")
      .where("id", req.params.id)
      .delete();
    return res.status(200).json(item);
  },
  validate: (method: ValidateMethod) => {
    switch (method) {
      case ValidateMethod.CREATE:
        return z.object({
          body: z.object({
            name: z.string(),
            slug: z.string().regex(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/),
          }),
        });
      case ValidateMethod.UPDATE:
        return z.object({
          body: z.object({
            name: z.string(),
            slug: z.string().regex(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/),
          }),
          params: z.object({
            id: z.string().uuid(),
          }),
        });
      case ValidateMethod.ID:
        return z.object({
          params: z.object({
            id: z.string().uuid(),
          }),
        });
      case ValidateMethod.SLUG:
        return z.object({
          params: z.object({
            slug: z.string().regex(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/),
          }),
        });
      default:
        return z.object({});
    }
  },
};

export default CategoryController;
