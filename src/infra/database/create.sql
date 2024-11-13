DROP TABLE IF EXISTS users, sales, categorys, products, purchases;

CREATE TABLE IF NOT EXISTS users (
    user_id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT,
    password TEXT,
    created_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sales (
    sale_id TEXT PRIMARY KEY,
    user_id TEXT,
    title TEXT,
    created_at TIMESTAMP,

    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE IF NOT EXISTS categorys (
    category_id TEXT PRIMARY KEY,
    title TEXT
);

CREATE TABLE IF NOT EXISTS products (
    product_id TEXT PRIMARY KEY,
    user_id TEXT,
    sale_id TEXT,
    title TEXT,
    price NUMERIC,
    category TEXT,
    description TEXT,
    quantity INT,
    created_at TIMESTAMP,

    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (user_id),
    CONSTRAINT fk_sale FOREIGN KEY (sale_id) REFERENCES sales (sale_id)
);

CREATE TABLE IF NOT EXISTS purchases (
    purchase_id TEXT PRIMARY KEY,
    sale_id TEXT,
    user_id TEXT,
    products TEXT[],
    created_at TIMESTAMP,
    CONSTRAINT fk_sale FOREIGN KEY (sale_id) REFERENCES sales (sale_id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (user_id)
);

INSERT INTO categorys (category_id, title) VALUES 
('b32bcde8-4910-4903-a958-d628ef6c0602', 'laptops'),
('baa03e6e-8c50-4e61-aeb1-c4e7c3c08382', 'primters'),
('938934a6-dec3-4dc0-9a18-a1ab66a9c91d', 'smartphons');
