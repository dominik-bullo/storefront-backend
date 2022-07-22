import Client from "../database";

export interface Book {
  id: number;
  title: string;
  author: string;
  total_pages: number;
  type: string;
  summary: string;
}

export class BookStore {
  async index(): Promise<Book[]> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM books";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get books: ${err}`);
    }
  }

  async show(id: string): Promise<Book> {
    try {
      const conn = await Client.connect();
      const sql = "SELECT * FROM books WHERE id = $1";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get book: ${err}`);
    }
  }

  async create(book: Omit<Book, "id">): Promise<Book> {
    try {
      const conn = await Client.connect();
      const sql =
        "INSERT INTO books (title, author, total_pages, type, summary) VALUES ($1, $2, $3, $4, $5) RETURNING *";
      const result = await conn.query(sql, [
        book.title,
        book.author,
        book.total_pages,
        book.type,
        book.summary,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot create book: ${err}`);
    }
  }

  async update(book: Book): Promise<Book> {
    try {
      const conn = await Client.connect();
      const sql =
        "UPDATE books SET title = $1, author = $2, total_pages = $3, type = $4, summary = $5 WHERE id = $6 RETURNING *";
      const result = await conn.query(sql, [
        book.title,
        book.author,
        book.total_pages,
        book.type,
        book.summary,
        book.id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot update book: ${err}`);
    }
  }

  async delete(id: string): Promise<Book> {
    try {
      const conn = await Client.connect();
      const sql = "DELETE FROM books WHERE id = $1 RETURNING *";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot delete book: ${err}`);
    }
  }
}
