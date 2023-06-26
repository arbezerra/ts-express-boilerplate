import request from "supertest";
import app from "../app";
import pool from "../lib/db";

describe("AUTH", () => {
  beforeAll(async () => {
    await pool.migrate.latest();
    await pool.seed.run();
  });
  afterAll(async () => {
    await pool.destroy();
  });
  
  test("GET /auth should be ok", async () => {
    return request(app).get("/auth").expect(200);
  });
  test("POST /auth should login", async () => {
    return request(app)
      .post("/auth")
      .send({ email: "test@cct.ufcg.edu.br", password: "123" })
      .expect(200);
  });
});
