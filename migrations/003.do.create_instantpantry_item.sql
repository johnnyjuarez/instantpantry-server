CREATE TABLE instantpantry_item (
  id SERIAL PRIMARY KEY,
  item_name TEXT NOT NULL,
  amount TEXT NOT NULL,
  image TEXT,
  barcode TEXT,
  category_id INTEGER REFERENCES instantpantry_category(id) ON DELETE CASCADE NOT NULL
)