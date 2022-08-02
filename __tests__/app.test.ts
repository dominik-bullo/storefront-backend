import request from "supertest";
import app from "../src/app";
import { Server } from "http";

describe("Integration Tests", () => {
  let token: string;
  let openOrderId: string;
  describe("/users/auth/ [POST]: User authentication", () => {
    it("should return a 401 if no credentials are provided", async () => {
      const response = await request(app).post("/users/auth");
      expect(response.status).toBe(401);
    });
    it("should return a 401 if invalid credentials are provided", async () => {
      const response = await request(app)
        .post("/users/auth")
        .send({ email: "wrongUser@mail.com", password: "wrongPassword" });
      expect(response.status).toBe(401);
    });
    it("should return a token if valid credentials are provided", async () => {
      const response = await request(app)
        .post("/users/auth")
        .send({ email: "test@test.ts", password: "test123" });
      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
      token = response.body.token;
    });
  });
  describe("/users/ [GET]: User index", () => {
    it("should return a 401 if no token is provided", async () => {
      const response = await request(app).get("/users");
      expect(response.status).toBe(401);
    });
    it("should return a list of users if token is provided", async () => {
      const response = await request(app)
        .get("/users")
        .set("x-auth-token", `${token}`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
  describe("/users/:id/ [GET]: Show user by id", () => {
    it("should return a 401 if no token is provided", async () => {
      const response = await request(app).get("/users/1");
      expect(response.status).toBe(401);
    });
    it("should return the user if token is provided", async () => {
      const response = await request(app)
        .get("/users/1")
        .set("x-auth-token", `${token}`);
      expect(response.status).toBe(200);
      expect(response.body.id).toBeDefined();
    });
  });
  describe("/users/ [POST]: Create user", () => {
    it("should return a 401 if no token is provided", async () => {
      const response = await request(app).post("/users");
      expect(response.status).toBe(401);
    });
    it("should return a 400 if token & invalid data is provided", async () => {
      const response = await request(app)
        .post("/users")
        .set("x-auth-token", `${token}`)
        .send({
          first_name: "TestUser",
          last_name: "TestUser",
          email: "testuser@test.ts",
        });
      expect(response.status).toBe(400);
    });
    it("should return a 201 if token & valid data is provided", async () => {
      const response = await request(app)
        .post("/users")
        .set("x-auth-token", `${token}`)
        .send([
          {
            first_name: "TestUser",
            last_name: "TestUser",
            email: "testuser@test.ts",
            password: "test123",
          },
        ]);
      expect(response.status).toBe(201);
      expect(response.body[0].id).toBeDefined();
    });
  });
  describe("/products/ [GET]: Product index", () => {
    it("should return a list of products", async () => {
      const response = await request(app).get("/products");
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
  describe("/products/:id/ [GET]: Show product by id", () => {
    it("should return the product by id", async () => {
      const response = await request(app).get("/products/1");
      expect(response.status).toBe(200);
      expect(response.body.id).toBeDefined();
    });
    it("should return a 404 if product is not found", async () => {
      const response = await request(app).get("/products/9999");
      expect(response.status).toBe(404);
    });
  });
  describe("/products/ [POST]: Create product", () => {
    it("should return a 401 if no token is provided", async () => {
      const response = await request(app).post("/products");
      expect(response.status).toBe(401);
    });
    it("should return a 400 if token & invalid data is provided", async () => {
      const response = await request(app)
        .post("/products")
        .set("x-auth-token", `${token}`)
        .send({
          name: "TestProduct",
          price: "TestProduct",
          category: "TestProduct",
        });
      expect(response.status).toBe(400);
    });
    it("should return a 201 if token & valid data is provided", async () => {
      const response = await request(app)
        .post("/products")
        .set("x-auth-token", `${token}`)
        .send({
          name: "TestProduct",
          price: 99.99,
          category: "TestProduct",
        });
      expect(response.status).toBe(201);
      expect(response.body.id).toBeDefined();
    });
  });
  describe("/orders/:userId [POST]: Create order", () => {
    it("should return a 401 if no token is provided", async () => {
      const response = await request(app).post("/orders/1");
      expect(response.status).toBe(401);
    });
    it("should return a 201 and the order ID if token is provided", async () => {
      const response = await request(app)
        .post("/orders/1")
        .set("x-auth-token", `${token}`);
      expect(response.status).toBe(201);
      expect(response.body.id).toBeDefined();
      expect(response.body.status).toEqual("active");
      openOrderId = response.body.id;
    });
  });
  describe("/orders/:userId [GET]: Show orders by user id", () => {
    it("should return a 401 if no token is provided", async () => {
      const response = await request(app).get("/orders/1");
      expect(response.status).toBe(401);
    });
    it("should return order if token is provided", async () => {
      const response = await request(app)
        .get("/orders/1")
        .set("x-auth-token", `${token}`);
      expect(response.status).toBe(200);
      expect(response.body.id).toBeDefined();
    });
  });
  describe("/orders/:userId/done [GET]: Show completed orders by user id", () => {
    it("should return a 401 if no token is provided", async () => {
      const response = await request(app).get("/orders/1/done");
      expect(response.status).toBe(401);
    });
    it("should return a list of orders if token is provided", async () => {
      const response = await request(app)
        .get("/orders/1/done")
        .set("x-auth-token", `${token}`);
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
  describe("/orders/:id [PATCH]: Toggle order status", () => {
    it("should return a 401 if no token is provided", async () => {
      const response = await request(app).patch(`/orders/${openOrderId}`);
      expect(response.status).toBe(401);
    });
    it("should return a 200 if token is provided", async () => {
      const response = await request(app)
        .patch(`/orders/${openOrderId}`)
        .set("x-auth-token", `${token}`);
      expect(response.status).toBe(200);
      expect(response.body.status).toEqual("complete");
    });
  });
  describe("/products-in-orders [GET]: Show products in orders", () => {
    it("should return a 401 if no token is provided", async () => {
      const response = await request(app).get("/products-in-orders");
      expect(response.status).toBe(401);
    });
    it("should return a list of products if token is provided", async () => {
      const response = await request(app)
        .get("/products-in-orders")
        .set("x-auth-token", `${token}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });
  describe("/popular [GET]: Show popular products", () => {
    it("should return a list of products", async () => {
      const response = await request(app).get("/popular");
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });
  describe("/category/:category [GET]: Show products by category", () => {
    it("should return a list of products", async () => {
      const response = await request(app).get("/category/Test");
      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });
});
