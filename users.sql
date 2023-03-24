CREATE TABLE IF NOT EXISTS users (
    username TEXT UNIQUE,
    password TEXT
  );

INSERT INTO users (username, password) 
VALUES ('NoahTest1', 'thisisatestpassword');