import Client from "../database";

export interface Order {
  id: string;
  user_id: string;
  status: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
}

export class OrderStore {
  async create(userId: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO orders (user_id, status) VALUES ($1, 'active') RETURNING *";
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot create order: ${err}`);
    }
  }

  async showByUserId(userId: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql =
        "SELECT * FROM orders WHERE user_id = $1 AND status = 'active' ORDER BY id DESC";
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get orders by user: ${err}`);
    }
  }

  async showCompletedByUserId(userId: string): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql =
        "SELECT * FROM orders WHERE user_id = $1 AND status = 'complete' ORDER BY id ASC";
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get orders by user: ${err}`);
    }
  }

  async toggleStatus(orderId: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql =
        "UPDATE orders SET status = CASE WHEN status = 'active' THEN 'complete' ELSE 'active' END WHERE id = $1 RETURNING *";
      const result = await conn.query(sql, [orderId]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot toggle order status: ${err}`);
    }
  }

  async end(): Promise<void> {
    await Client.end();
  }
}
