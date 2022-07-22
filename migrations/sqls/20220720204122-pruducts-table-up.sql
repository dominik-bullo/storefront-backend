CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name varchar(100) NOT NULL,
  price decimal(10,2) NOT NULL,
  category varchar(30) NOT NULL
);