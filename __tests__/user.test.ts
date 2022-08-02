import { User, UserStore } from "../src/models/user";

describe("User Model", () => {
  const store = new UserStore();
  const testUser: Omit<User, "id"> = {
    first_name: "Test",
    last_name: "Test",
    email: "test@test.ts",
    password: "$2b$10$An.e227ItIduJLVZ5mSJ/u4vg.wx9EakKYIoPJ/C9pa6OoQcNSyrS",
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
  it("should have a findByEmail method", () => {
    expect(store.findByEmail).toBeDefined();
  });
  it("create method should return a user id", async () => {
    const user = await store.create(testUser);
    expect(user.id).toBeDefined();
    testId = user.id;
  });
  it("index method should return a list of users", async () => {
    const users = await store.index();
    expect(users.length).toBeGreaterThan(0);
  });
  it("show method should return a user", async () => {
    const user = await store.show(testId);
    expect(user.id).toEqual(testId);
  });
  it("findByEmail method should return a user", async () => {
    const user = await store.findByEmail(testUser.email);
    expect(user.id).toEqual(testId);
  });
  afterAll(async () => {
    await store.end();
  });
});
