import request from "supertest";
import app from "../app";

describe("AUTH", () => {
  test("GET /auth should be ok", async () => {
    return request(app).get("/auth").expect(200);
  });
});
