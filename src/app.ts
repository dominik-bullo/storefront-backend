import express, { Request, Response } from "express";
import booksRouter from "./handler/books";
import productsRouter from "./handler/products";
import usersRouter from "./handler/users";
import bodyParser from "body-parser";

const app: express.Application = express();

app
  .use(bodyParser.json())
  .use("/books", booksRouter)
  .use("/products", productsRouter)
  .use("/users", usersRouter);

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

export default app;
