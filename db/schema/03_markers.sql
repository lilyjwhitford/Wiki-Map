-- Drop and recreate markers table

DROP TABLE IF EXISTS markers CASCADE;
CREATE TABLE markers (
  id SERIAL PRIMARY KEY NOT NULL,
  creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  x_coord INTEGER NOT NULL,
  y_coord INTEGER NOT NULL,
  marker_title VARCHAR(255) NOT NULL,
  marker_description VARCHAR(140) NOT NULL,
  marker_image VARCHAR(255) NOT NULL
);
