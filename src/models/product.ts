import Client from "../database";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get products: ${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM products WHERE id = $1";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get product: ${err}`);
    }
  }

  async create(product: Omit<Product, "id">): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *";
      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot create product: ${err}`);
    }
  }
}
