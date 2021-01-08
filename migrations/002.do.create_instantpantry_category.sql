CREATE TABLE instantpantry_category (
  id SERIAL PRIMARY KEY,
  category_title TEXT NOT NULL,
  user_id INTEGER REFERENCES instantpantry_user(id) ON DELETE CASCADE NOT NULL
)