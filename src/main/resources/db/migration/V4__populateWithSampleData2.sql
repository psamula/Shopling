-- Insert some shopping lists
INSERT INTO shopping_list (name, author_id, created_at)
VALUES
    ('Biedronka 24.05.2023', 2, '2023-05-24'),
    ('Na wyjazd w góry', 2, '2023-06-01'),
    ('Lidl 28.05.2023', 2, '2023-05-28'),
    ('For picnic', 2, '2023-06-02');

-- Update the products to link them to the shopping lists
UPDATE product
SET list_id = (SELECT id FROM shopping_list WHERE name = 'Biedronka 24.05.2023')
WHERE name IN ('Cheese', 'Cereal', 'Eggs', 'Onions', 'Bread', 'Garlic', 'Olive Oil', 'Pepper', 'Salt', 'Tomatoes', 'Apples', 'Oranges');

UPDATE product
SET list_id = (SELECT id FROM shopping_list WHERE name = 'Na wyjazd w góry')
WHERE name IN ('Pasta', 'Tomato Sauce', 'Biscuits', 'Rice', 'Butter', 'Milk', 'Tea', 'Coffee', 'Honey');

UPDATE product
SET list_id = (SELECT id FROM shopping_list WHERE name = 'Lidl 28.05.2023')
WHERE name IN ('Yogurt', 'Juice', 'Bananas', 'Tuna', 'Chicken', 'Peanut Butter', 'Flour', 'Sugar', 'Spaghetti');

UPDATE product
SET list_id = (SELECT id FROM shopping_list WHERE name = 'For picnic')
WHERE name IN ('Sandwich bread', 'Ham', 'Mustard', 'Jam', 'Sausages', 'Potatoes', 'Bacon', 'Sour Cream', 'Cucumber');
