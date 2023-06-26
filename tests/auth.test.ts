import request from "supertest";
import app from "../app";
import pool from "../lib/db";

describe("AUTH", () => {
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

  test("GET /auth should return 401", async () => {
    return request(app).get("/auth").expect(401);
  });

  test("GET /auth should be ok", async () => {
    return request(app)
      .get("/auth")
      .set({ Authorization: `Bearer ${token}` })
      .expect(200);
  });
  test("POST /auth should login", async () => {
    return request(app)
      .post("/auth")
      .send({ email: "test@cct.ufcg.edu.br", password: "123" })
      .expect(200);
  });
  test("POST /auth should return 422", async () => {
    return request(app)
      .post("/auth")
      .send({ email: "test@cct.ufcg.edu.br", password: "321" })
      .expect(422);
  });
  test("PUT /auth should register", async () => {
    return request(app)
      .put("/auth")
      .send({
        username: "test2",
        firstName: "First",
        lastName: "Last",
        email: "test2@cct.ufcg.edu.br",
        password: "123",
      })
      .expect(200);
  });
});
