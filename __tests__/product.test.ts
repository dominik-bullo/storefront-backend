import { Product, ProductStore } from "../src/models/product";

describe("Product Model", () => {
  const store = new ProductStore();
  const testProduct: Omit<Product, "id"> = {
    name: "Test",
    price: "1.99",
    category: "Test",
  };
  let testId: string;

  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });
  it("create method should return a product id", async () => {
    const product = await store.create(testProduct);
    expect(product.id).toBeDefined();
    testId = product.id;
  });
  it("index method should return a list of products", async () => {
    const products = await store.index();
    expect(products.length).toBeGreaterThan(0);
  });
  it("show method should return a product", async () => {
    const product = await store.show(testId);
    expect(product.id).toEqual(testId);
    expect(product.name).toEqual(testProduct.name);
    expect(product.price).toEqual(testProduct.price);
    expect(product.category).toEqual(testProduct.category);
  });
  afterAll(async () => {
    await store.end();
  });
});
