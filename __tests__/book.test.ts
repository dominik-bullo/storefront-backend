import { Book, BookStore } from "../src/models/book";

const store = new BookStore();

describe("Book Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("index method should return a list of books", async () => {
    const books = await store.index();
    expect(books).toEqual([]);
  });
});