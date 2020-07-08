-- Hottest sneakers (good condition, price > $120)
SELECT url, model, current_price, date_created, heat, condition, shipping_ca
FROM grailed_sneakers
WHERE heat > 2385 AND condition != 'is_used' AND condition != 'is_worn' AND current_price > 120
ORDER BY heat DESC;

-- Hottest sneakers (ordered by ascending price)
SELECT url, model, current_price, date_created, heat, condition, shipping_ca
FROM grailed_sneakers
WHERE heat > 2385 AND condition != 'is_used' AND condition != 'is_worn' AND current_price > 120
ORDER BY heat DESC, current_price;

-- Hottest sneakers (within a price range)
SELECT url, model, current_price, date_created, heat, condition, shipping_ca
FROM grailed_sneakers
WHERE heat > 2375 AND current_price > 120 AND current_price < 250
ORDER BY heat DESC;
