-- insert more products
DO $$DECLARE
  biedronka_list_id integer;
  gory_list_id integer;
  lidl_list_id integer;
  picnic_list_id integer;
BEGIN
  SELECT id INTO biedronka_list_id FROM shopping_list WHERE name = 'Biedronka 24.05.2023';
  SELECT id INTO gory_list_id FROM shopping_list WHERE name = 'Na wyjazd w góry';
  SELECT id INTO lidl_list_id FROM shopping_list WHERE name = 'Lidl 28.05.2023';
  SELECT id INTO picnic_list_id FROM shopping_list WHERE name = 'For picnic';

  -- insert some products into each list
  INSERT INTO product (name, list_id)
  VALUES
  ('Cheese', biedronka_list_id),
  ('Cereal', biedronka_list_id),
  ('Eggs', biedronka_list_id),
  ('Pasta', gory_list_id),
  ('Tomato Sauce', gory_list_id),
  ('Biscuits', gory_list_id),
  ('Yogurt', lidl_list_id),
  ('Juice', lidl_list_id),
  ('Bananas', lidl_list_id),
  ('Sandwich bread', picnic_list_id),
  ('Ham', picnic_list_id),
  ('Mustard', picnic_list_id),
  ('Onions', biedronka_list_id),
  ('Bread', biedronka_list_id),
  ('Garlic', biedronka_list_id),
  ('Rice', gory_list_id),
  ('Butter', gory_list_id),
  ('Milk', gory_list_id),
  ('Tuna', lidl_list_id),
  ('Chicken', lidl_list_id),
  ('Peanut Butter', lidl_list_id),
  ('Jam', picnic_list_id),
  ('Sausages', picnic_list_id),
  ('Potatoes', picnic_list_id),
  ('Olive Oil', biedronka_list_id),
  ('Pepper', biedronka_list_id),
  ('Salt', biedronka_list_id),
  ('Tea', gory_list_id),
  ('Coffee', gory_list_id),
  ('Honey', gory_list_id),
  ('Flour', lidl_list_id),
  ('Sugar', lidl_list_id),
  ('Spaghetti', lidl_list_id),
  ('Bacon', picnic_list_id),
  ('Sour Cream', picnic_list_id),
  ('Cucumber', picnic_list_id),
  ('Tomatoes', biedronka_list_id),
  ('Apples', biedronka_list_id),
  ('Oranges', biedronka_list_id);
END$$;