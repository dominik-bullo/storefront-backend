import Client from "../database";

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users ORDER BY id ASC";
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

  async findByEmail(email: string): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM users WHERE email = $1";
      const result = await conn.query(sql, [email]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get user: ${err}`);
    }
  }

  async create(user: Omit<User, "id">): Promise<Omit<User, "password">> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING id, email, first_name, last_name";
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

  async end(): Promise<void> {
    await Client.end();
  }
}
