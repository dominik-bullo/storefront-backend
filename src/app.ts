import express, { Application, Request, Response } from "express";
import productsRouter from "./handler/products";
import usersRouter from "./handler/users";
import ordersRouter from "./handler/orders";
import dashboardRouter from "./handler/dashboard";
import bodyParser from "body-parser";

const app: Application = express();

app
  .use(bodyParser.json())
  .use("/products", productsRouter)
  .use("/users", usersRouter)
  .use("/orders", ordersRouter)
  .use("/", dashboardRouter);

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

export default app;
