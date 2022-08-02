import { DashboardQueries } from "../src/services/dashboard";

describe("Dashboard Queries", () => {
  const queries = new DashboardQueries();

  it("should have a productsInOrders method", () => {
    expect(queries.productsInOrders).toBeDefined();
  });

  it("should have a popularProducts method", () => {
    expect(queries.popularProducts).toBeDefined();
  });

  it("should have a productsByCategory method", () => {
    expect(queries.productsByCategory).toBeDefined();
  });
  it("productsInOrders method should return a list of products", async () => {
    const result = await queries.productsInOrders();
    expect(result).toEqual([]);
  });
  it("popularProducts method should return a list of products", async () => {
    const result = await queries.popularProducts();
    expect(result).toEqual([]);
  });
  it("productsByCategory method should return a list of products", async () => {
    const result = await queries.productsByCategory("Test");
    expect(result.length).toBeGreaterThan(0);
  });
});
