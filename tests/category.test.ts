import request from "supertest";
import app from "../app";
import pool from "../lib/db";
import Category from "../models/category";

describe("Category", () => {
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

  test("GET /category 200", async () => {
    return request(app).get("/category").expect(200);
  });

  test("GET /category/:id 200", async () => {
    const result = await request(app).get("/category");
    return request(app).get(`/category/${result.body[0].id}`).expect(200);
  });

  test("GET /category/slug/:slug 200", async () => {
    const result = await request(app).get("/category");
    return request(app)
      .get(`/category/slug/${result.body[0].slug}`)
      .expect(200);
  });

  test("POST /category 200", async () => {
    return request(app)
      .post("/category")
      .send({ name: "Teste", slug: "teste" })
      .set({ Authorization: `Bearer ${token}` })
      .expect(200);
  });

  test("PUT /category 200", async () => {
    const result = await request(app).get("/category");
    return request(app)
      .put(`/category/${result.body[0].id}`)
      .send({ name: "Teste", slug: "teste2" })
      .set({ Authorization: `Bearer ${token}` })
      .expect(200);
  });

  test("DELETE /category 200", async () => {
    const result = await request(app).get("/category");
    return request(app)
      .delete(`/category/${result.body[0].id}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(200);
  });
});
