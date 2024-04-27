-- Drop and recreate maps table 

DROP TABLE IF EXISTS maps CASCADE;
CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  map_title VARCHAR(255) NOT NULL,
  map_description VARCHAR(255) NOT NULL, 
  map_image VARCHAR(255) NOT NULL
);
