import Client from "../database";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get users: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users WHERE id = $1";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get user: ${err}`);
    }
  }

  async create(user: Omit<User, "id">): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING *";
      const result = await conn.query(sql, [
        user.email,
        user.first_name,
        user.last_name,
        user.password,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot create user: ${err}`);
    }
  }
}
