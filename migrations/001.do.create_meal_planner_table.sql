CREATE TABLE users (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    user_name VARCHAR (255) UNIQUE NOT NULL,
    password VARCHAR (225) NOT NULL
);

