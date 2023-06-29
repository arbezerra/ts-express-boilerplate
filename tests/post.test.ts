import request from "supertest";
import app from "../app";
import pool from "../lib/db";
import User from "../models/user";
import Category from "../models/category";
import Post from "../models/post";

describe("Post", () => {
  let token: string;
  beforeAll(async () => {
    await pool.migrate.latest();
    await pool.seed.run();
    const result = await request(app).post("/auth").send({
      email: "test@cct.ufcg.edu.br",
      password: "123",
    });
    token = result.body.token;
  });
  afterAll(async () => {
    await pool.destroy();
  });

  test("GET /post 200", async () => {
    return request(app).get("/post").expect(200);
  });

  test("GET /post/:id 200", async () => {
    const post = await pool<Post>("posts").first();
    return request(app).get(`/post/${post!.id}`).expect(200);
  });

  test("GET /post/slug/:slug 200", async () => {
    const post = await pool<Post>("posts").first();
    return request(app)
      .get(`/post/slug/${post!.slug}`)
      .expect(200);
  });

  test("POST /post 200", async () => {
    const user = await pool<User>("users").first();
    const category = await pool<Category>("categories").first();
    return request(app)
      .post("/post")
      .send({
        title: "New Post",
        slug: "new-post",
        content: "New Post!",
        summary: "New Post...",
        author_id: user!.id,
        category_id: category!.id,
      })
      .set({ Authorization: `Bearer ${token}` })
      .expect(200);
  });

  test("PUT /post 200", async () => {
    const post = await pool<Post>("posts").first();
    const user = await pool<User>("users").first();
    const category = await pool<Category>("categories").first();
    return request(app)
      .put(`/post/${post?.id}`)
      .send({
        title: "New Post 2",
        slug: "new-post2",
        content: "New Post 2!",
        summary: "New Post 2...",
        author_id: user!.id,
        category_id: category!.id,
      })
      .set({ Authorization: `Bearer ${token}` })
      .expect(200);
  });

  test("DELETE /post 200", async () => {
    const post = await pool<Post>("posts").first();
    return request(app)
      .delete(`/post/${post!.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(200);
  });
});
