CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email varchar(100),
    first_name varchar(100) NOT NULL,
    last_name varchar(100) NOT NULL,
    password varchar(100) NOT NULL
)