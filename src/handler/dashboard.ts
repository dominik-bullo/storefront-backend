import { Router, Response, Request } from "express";
import { DashboardQueries } from "../services/dashboard";
import auth from "../middleware/auth";

const dashboard: Router = Router();
const queries = new DashboardQueries();

const productsInOrders = async (_req: Request, res: Response) => {
  try {
    const result = await queries.productsInOrders();
    res.json(result);
  } catch (err) {
    res.sendStatus(500);
  }
};

const popularProducts = async (_req: Request, res: Response) => {
  try {
    const result = await queries.popularProducts();
    res.json(result);
  } catch (err) {
    res.sendStatus(500);
  }
};

const productsByCategory = async (req: Request, res: Response) => {
  try {
    const result = await queries.productsByCategory(req.params.category);
    res.json(result);
  } catch (err) {
    res.sendStatus(500);
  }
};

dashboard
  .get("/products-in-orders", auth, productsInOrders)
  .get("/popular", popularProducts)
  .get("/category/:category", productsByCategory);

export default dashboard;
