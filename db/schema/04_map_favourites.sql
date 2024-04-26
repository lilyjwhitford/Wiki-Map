-- Drop and recreate favourites table

DROP TABLE IF EXISTS map_favourites CASCADE;
CREATE TABLE map_favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE
);
