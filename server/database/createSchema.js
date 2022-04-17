import { db } from "./createConnection.js";

const inDeleteMode = true;

if (inDeleteMode) {
    db.exec("DROP TABLE IF EXISTS items;");
    db.exec("DROP TABLE IF EXISTS cartitems;");
    db.exec("DROP TABLE IF EXISTS users;");
}

db.exec(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50),
    category VARCHAR(50),
    year INT,
    price INT,
    img VARCHAR(50)
);`);

db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(30),
    email VARCHAR(50) UNIQUE,
    password VARCHAR(100)
);`);


db.exec(`CREATE TABLE IF NOT EXISTS cartitems (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INT,
    item_id INT,
    CONSTRAINT FK_user_cartitem FOREIGN KEY (user_id)
    REFERENCES users(id),
    CONSTRAINT FK_item_cartitem FOREIGN KEY (item_id)
    REFERENCES items(id) 
    );`); 


// Seed my database
if (inDeleteMode) {
    db.run(`INSERT INTO items (name, category, year, price, img) VALUES 
    ('The Policeman', 'Uniformed', '2005', '50', 'police.jpg'),
    ('The good neighbour', 'Classic', '2015', '35', 'beardman.jpg'),
    ('Bicycle love', 'Classic', '2019', '45', 'bicycle.jpg'),
    ('Stormtrooper', 'Uniformed', '2008', '65', 'stormtrooper.jpg'),
    ('Dr. House', 'Vintage', '1992', '75', 'vintage.jpg'),
    ('The Wizard', 'Classic', '2000', '50', 'wizard.jpg'),
    ('Astronaut', 'Vintage', '1988', '95', 'astronaut.jpg'),
    ('Handyman Red', 'Classic', '2005', '40', 'handyman.jpg'),
    ('Chicken Costume', 'Classic', '2020', '50', 'chicken.jpg')
    `);
}

db.close();
