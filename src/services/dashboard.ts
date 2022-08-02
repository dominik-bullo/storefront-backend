import Client from "../database";
import { Product } from "../models/product";

export class DashboardQueries {
  //  get all products that have been included in orders

  async productsInOrders(): Promise<
    {
      name: string;
      price: number;
      order_id: string;
      quantity: number;
    }[]
  > {
    try {
      const conn = await Client.connect();
      const sql =
        "SELECT name, price, order_id, quantity FROM products INNER JOIN order_items ON products.id = order_items.product_id ORDER BY products.id ASC";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get products in orders: ${err}`);
    }
  }

  async popularProducts(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql =
        "SELECT products.id, name, price, category FROM products INNER JOIN order_items ON products.id = order_items.product_id GROUP BY products.id ORDER BY SUM(quantity) DESC LIMIT 5";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get popular products: ${err}`);
    }
  }

  async productsByCategory(
    category: string
  ): Promise<Omit<Product, "category">[]> {
    try {
      const conn = await Client.connect();
      const sql =
        "SELECT id, name, price FROM products WHERE category = $1 ORDER BY id ASC";
      const result = await conn.query(sql, [category]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get products by category: ${err}`);
    }
  }
}
