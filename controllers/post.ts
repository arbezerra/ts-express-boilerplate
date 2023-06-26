import { Request, Response } from "express";
import pool from "../lib/db";
import { verify } from "../lib/hash";
import User from "../models/user";
import jwt from "jsonwebtoken";
import Post from "../models/post";

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
    const item = await pool<Post>("posts").where("slug", req.params.slug).first();
    return res.status(200).json(item);
  },
  store: async (req: Request, res: Response) => {
    const item = await pool<Post>("posts").insert(req.body);
    return res.status(200).json(item);
  },
  update: async (req: Request, res: Response) => {
    const item = await pool<Post>("posts").where("id", req.params.id).update(req.body);
    return res.status(200).json(item);
  },
  delete: async (req: Request, res: Response) => {
    const item = await pool<Post>("posts").where("id", req.params.id).delete();
    return res.status(200).json(item);
  },
};

export default PostController;
