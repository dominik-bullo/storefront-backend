import { Router, Response, Request } from "express";
import { Book, BookStore } from "../models/book";

const books: Router = Router();
const store = new BookStore();

const index = async (req: Request, res: Response) => {
  try {
    const books = await store.index();
    res.json(books);
  } catch (err: unknown) {
    res.sendStatus(500);
  }
};

const show = async (req: Request, res: Response) => {
  const id = req.params.id;
  const book = await store.show(id);
  res.json(book);
};

const create = async (req: Request, res: Response) => {
  const book = req.body;
  const newBook = await store.create(book);
  res.json(newBook);
};

const update = async (req: Request, res: Response) => {
  const book: Book = req.body;
  const updatedBook = await store.update(book);
  res.json(updatedBook);
};

const destroy = async (req: Request, res: Response) => {
  const id = req.params.id;
  const book = await store.delete(id);
  res.json(book);
};

books
  .get("/", index)
  .get("/:id", show)
  .post("/", create)
  .put("/", update)
  .delete("/:id", destroy);

export default books;
