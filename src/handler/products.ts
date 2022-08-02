import { Router, Response, Request } from "express";
import { Product, ProductStore } from "../models/product";
import auth from "../middleware/auth";

const products: Router = Router();
const store = new ProductStore();

const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index();
    products.length > 0 ? res.json(products) : res.sendStatus(404);
  } catch (err) {
    res.sendStatus(500);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await store.show(id);
    product ? res.json(product) : res.sendStatus(404);
  } catch (err) {
    res.sendStatus(400);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const newProduct = await store.create(product);
    res.status(201).json(newProduct);
  } catch (err) {
    res.sendStatus(400);
  }
};

products.get("/", index).get("/:id", show).post("/", auth, create);

export default products;
