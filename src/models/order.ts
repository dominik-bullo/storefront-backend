import Client from "../database";

export interface Order {
  id: number;
  user_id: number;
  status: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
}

export class OrderStore {
  // Orders

  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get orders: ${err}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders WHERE id = $1";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get order: ${err}`);
    }
  }

  async create(order: Omit<Order, "id">): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *";
      const result = await conn.query(sql, [order.user_id, order.status]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot create order: ${err}`);
    }
  }

  async update(order: Order): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql =
        "UPDATE orders SET user_id = $1, status = $2 WHERE id = $3 RETURNING *";
      const result = await conn.query(sql, [
        order.user_id,
        order.status,
        order.id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot update order: ${err}`);
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE FROM orders WHERE id = $1 RETURNING *";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot delete order: ${err}`);
    }
  }

  // Order Items

  async addOrderItem(
    orderId: number,
    productId: number,
    qty: number
  ): Promise<OrderItem> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *";
      const result = await conn.query(sql, [orderId, productId, qty]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot add order item: ${err}`);
    }
  }

  async updateOrderItem(orderItem: OrderItem): Promise<OrderItem> {
    try {
      const conn = await Client.connect();
      const sql =
        "UPDATE order_items SET order_id = $1, product_id = $2, quantity = $3 WHERE id = $4 RETURNING *";
      const result = await conn.query(sql, [
        orderItem.order_id,
        orderItem.product_id,
        orderItem.quantity,
        orderItem.id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot update order item: ${err}`);
    }
  }

  async deleteOrderItem(id: string): Promise<OrderItem> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE FROM order_items WHERE id = $1 RETURNING *";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot delete order item: ${err}`);
    }
  }
}
