CREATE TABLE IF NOT EXISTS shopping_list (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    author_id INT,
    created_at DATE
);
CREATE TABLE IF NOT EXISTS product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    list_id INT REFERENCES shopping_list(id)
);