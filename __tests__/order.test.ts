import { Order, OrderItem, OrderStore } from "../src/models/order";

describe("Order Model", () => {
  const store = new OrderStore();

  it("should have an create method", () => {
    expect(store.create).toBeDefined();
  });
  it("should have a showByUserId method", () => {
    expect(store.showByUserId).toBeDefined();
  });
  it("should have a showCompletedByUserId method", () => {
    expect(store.showCompletedByUserId).toBeDefined();
  });
  it("should have a toggleStatus method", () => {
    expect(store.toggleStatus).toBeDefined();
  });
  it("create method should return an order id", async () => {
    const order = await store.create("1");
    expect(order.id).toBeDefined();
  });
  it("showByUserId method should return an order", async () => {
    const order = await store.showByUserId("1");
    expect(order.id).toBeDefined();
  });
  it("toggle status method should return order with new status", async () => {
    const order = await store.toggleStatus("1");
    expect(order.status).toBe("complete");
  });
  it("showCompletedByUserId method should return an order", async () => {
    const order = await store.showCompletedByUserId("1");
    expect(order.length).toBeGreaterThan(0);
  });
  afterAll(async () => {
    await store.end();
  });
});
