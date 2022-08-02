import { Router, Response, Request } from "express";
import { Order, OrderStore } from "../models/order";
import auth from "../middleware/auth";

const orders: Router = Router();
const store = new OrderStore();

const create = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const order = await store.create(userId);
    res.status(201).json(order);
  } catch (err) {
    res.sendStatus(400);
  }
};

const showByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const order = await store.showByUserId(userId);
    order ? res.json(order) : res.sendStatus(404);
  } catch (err) {
    res.sendStatus(400);
  }
};

const showCompletedByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const orders = await store.showCompletedByUserId(userId);
    orders.length > 0 ? res.json(orders) : res.sendStatus(404);
  } catch (err) {
    res.sendStatus(400);
  }
};

const toggleStatus = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const order = await store.toggleStatus(id);
    order ? res.json(order) : res.sendStatus(404);
  } catch (err) {
    res.sendStatus(400);
  }
};

orders
  .use(auth)
  .post("/:userId", create)
  .get("/:userId", showByUserId)
  .get("/:userId/done", showCompletedByUserId)
  .patch("/:id", toggleStatus);

export default orders;
