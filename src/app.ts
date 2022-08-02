import express, { Application, Request, Response } from "express";
import productsRouter from "./handler/products";
import usersRouter from "./handler/users";
import ordersRouter from "./handler/orders";
import dashboardRouter from "./handler/dashboard";
import bodyParser from "body-parser";
import cors from "cors";

const app: Application = express();

app
  .use(cors())
  .use(bodyParser.json())
  .use("/products", productsRouter)
  .use("/users", usersRouter)
  .use("/orders", ordersRouter)
  .use("/", dashboardRouter);

export default app;
