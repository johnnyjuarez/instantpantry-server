BEGIN;

TRUNCATE
  instantpantry_user,
  instantpantry_category,
  instantpantry_item
  RESTART IDENTITY CASCADE;

INSERT INTO instantpantry_user (username, name, password)
VALUES
  ('test', 'name', '$2a$04$QLem4thNGYMoQ2cVsUKUqOuXrdeElKblSRgVYuXcuydATdMAKkxFG'),
  ('doesthiswork', 'reapnsow', '$2a$04$QLem4thNGYMoQ2cVsUKUqOuXrdeElKblSRgVYuXcuydATdMAKkxFG'),
  ('testtest', 'secondname', '$2a$04$QLem4thNGYMoQ2cVsUKUqOuXrdeElKblSRgVYuXcuydATdMAKkxFG');

INSERT INTO instantpantry_category (category_title, user_id)
VALUES
  ('spices', 1),
  ('spices', 2),
  ('herbs', 3);

INSERT INTO instantpantry_item (item_name, amount, image, barcode, category_id)
VALUES
  ('paprika', '4 grams', 'image.url', 'UIDEIN', 1),
  ('rosemary', 'small container', 'image.url', 'UIDEIN1', 2),
  ('cumin', '2 grams', 'image.url', 'UIDEIN2', 1),
  ('basil', 'a lot', 'image.url', 'UIDEIN3', 3);

COMMIT;