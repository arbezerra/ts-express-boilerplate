import { Request, Response } from "express";
import pool from "../lib/db";
import Post from "../models/post";
import { ValidateMethod } from "../middlewares/validate";
import { z } from "zod";
import { v4 as uuid4 } from "uuid";

const PostController = {
  index: async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 0;
    const size = parseInt(req.query.size as string) || 5;
    const items = pool<Post>("posts")
      .offset(page * size)
      .limit(size)
      .orderBy("date", "desc");
    const total = pool<{ total: number }>("posts")
      .count("id", { as: "total" })
      .first();
    return res.status(200).json({
      items: await items,
      paginate: {
        page,
        size,
        total: (await total)?.total,
      },
    });
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
    req.body.id = uuid4();
    const item = await pool<Post>("posts").insert(req.body, "id");
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
      case ValidateMethod.PAGINATE:
        return z.object({
          query: z.object({
            page: z.string().optional().transform((x) => parseInt(x || "0")).pipe(z.number().nonnegative()),
            size: z.string().optional().transform((x) => parseInt(x || "5")).pipe(z.number().positive()),
          }),
        });
      default:
        return z.object({});
    }
  },
};

export default PostController;
