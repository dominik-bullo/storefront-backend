CREATE TABLE books (
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    total_pages INTEGER NOT NULL,
    type VARCHAR(50) NOT NULL,
    summary TEXT, id SERIAL PRIMARY KEY
);