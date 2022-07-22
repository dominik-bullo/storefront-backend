import { Router, Response, Request } from "express";
import { Order, OrderStore } from "../models/order";

const orders: Router = Router();
const store = new OrderStore();

const index = async (req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    res.sendStatus(500);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const order = await store.show(id);
    res.json(order);
  } catch (err) {
    res.sendStatus(500);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.sendStatus(500);
  }
};

export default orders;
