import { Request, Response } from "express";
import pool from "../lib/db";
import { verify } from "../lib/hash";
import User from "../models/user";
import jwt from "jsonwebtoken";
import Post from "../models/post";
import { ValidateMethod } from "../middlewares/validate";
import { z } from "zod";

const PostController = {
  index: async (req: Request, res: Response) => {
    const items = await pool<Post>("posts");
    return res.status(200).json(items);
  },
  show: async (req: Request, res: Response) => {
    const item = await pool<Post>("posts").where("id", req.params.id).first();
    return res.status(200).json(item);
  },
  slug: async (req: Request, res: Response) => {
    const item = await pool<Post>("posts")
      .where("slug", req.params.slug)
      .first();
    return res.status(200).json(item);
  },
  store: async (req: Request, res: Response) => {
    const item = await pool<Post>("posts").insert(req.body);
    return res.status(200).json(item);
  },
  update: async (req: Request, res: Response) => {
    const item = await pool<Post>("posts")
      .where("id", req.params.id)
      .update(req.body);
    return res.status(200).json(item);
  },
  delete: async (req: Request, res: Response) => {
    const item = await pool<Post>("posts").where("id", req.params.id).delete();
    return res.status(200).json(item);
  },
  validate: (method: ValidateMethod) => {
    switch (method) {
      case ValidateMethod.CREATE:
        return z.object({
          body: z.object({
            title: z.string(),
            slug: z.string().regex(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/),
            content: z.string(),
            summary: z.optional(z.string()),
            date: z.optional(z.date()),
            author_id: z.string().uuid(),
            category_id: z.string().uuid(),
          }),
        });
      case ValidateMethod.UPDATE:
        return z.object({
          body: z.object({
            title: z.string(),
            slug: z.string().regex(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/),
            content: z.string(),
            summary: z.optional(z.string()),
            date: z.optional(z.date()),
            author_id: z.string().uuid(),
            category_id: z.string().uuid(),
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

export default PostController;
