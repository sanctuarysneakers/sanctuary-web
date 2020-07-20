-- Grailed: Hottest sneakers (good condition, price > $120)
SELECT url, model, current_price, date_created, heat, condition, shipping_ca
FROM grailed_sneakers
WHERE heat > 2385 AND condition != 'is_used' AND condition != 'is_worn' AND current_price > 120
ORDER BY heat DESC;

-- Grailed: Hottest sneakers (ordered by ascending price)
SELECT url, model, current_price, date_created, heat, condition, shipping_ca
FROM grailed_sneakers
WHERE heat > 2385 AND condition != 'is_used' AND condition != 'is_worn' AND current_price > 120
ORDER BY heat DESC, current_price;

-- Grailed: Hottest sneakers (within a price range)
SELECT url, model, current_price, date_created, heat, condition, shipping_ca
FROM grailed_sneakers
WHERE heat > 2375 AND current_price > 120 AND current_price < 250
ORDER BY heat DESC;



-- StockX: Most popular models (most sold annually)
SELECT model, SUM(annual_sold), url
FROM stockx_sneakers
GROUP BY model
ORDER BY SUM(annual_sold) DESC;

-- StockX: Most popular categories (most sold annually)
SELECT category, SUM(annual_sold)
FROM stockx_sneakers
GROUP BY category
ORDER BY SUM(annual_sold) DESC;

-- StockX: Most volatile sneakers
SELECT *
FROM stockx_sneakers
WHERE lowest_ask_price > 120 AND annual_sold > 200
ORDER BY volatility DESC;

-- StockX: Best deals (1)
SELECT ROUND(100*((lowest_ask_price-average_price)/(1.0*average_price))) AS "Percent Change", model, size, lowest_ask_price, average_price, url
FROM stockx_sneakers
WHERE ((lowest_ask_price-average_price)/(1.0*average_price)) IS NOT NULL
  AND annual_sold > 150
  AND average_price > 120
  AND size=12
ORDER BY 100*((lowest_ask_price-average_price)/(1.0*average_price));



-- Flight Club: Amount of sneakers for each shoe size
SELECT size, COUNT(*) AS "Amount"
FROM flightclub_sneakers
GROUP BY size;



-- Goat: Trending sneakers ordered by lowest price
SELECT model, lowest_price_cad, url
FROM goat_sneakers
WHERE trending=TRUE AND size=12
ORDER BY lowest_price_usd;

-- Goat: Trending sneaker models that just dropped
SELECT model, lowest_price_cad, url
FROM goat_sneakers
WHERE trending=TRUE AND just_dropped=TRUE
GROUP BY model
ORDER BY lowest_price_cad;

-- Goat: Number of sneakers in each category
SELECT category, COUNT(*) AS "Amount"
FROM goat_sneakers
GROUP BY category
ORDER BY COUNT(*) DESC;

-- Goat: Number of different models in each category
SELECT category, COUNT(DISTINCT model) AS "Number of Models"
FROM goat_sneakers
GROUP BY category
ORDER BY COUNT(DISTINCT model) DESC;

