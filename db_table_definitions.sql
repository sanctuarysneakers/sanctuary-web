-- Changes from previous design

-- 1. Common and heavy attributes "category" and "model" which are the same for each
-- model are now refactored into a new table "model"

-- 2. For each source, use ENUM instead of TEXT to represent shoe_condition

-- 3. Table names {source}_sneakers have been renamed to {source}_product, and shoe_condition 
-- to product_condition so that the tables are still accurate if we expand to more than just shoes.

-- 4. Stock X products no longer have shoe_condition/product_condition because 
-- everything on StockX is "New".

-- 5. image and image_thumbnail do not exist in any table anymore.

-- 6. New table to track user data (person) and to track which shoes a user clicks on (person_model)

CREATE TABLE model (
	sku_id VARCHAR(20),
	category text,
    model text,
    PRIMARY KEY (sku_id)
);

CREATE TABLE flightclub_product (
	id INT PRIMARY KEY,
    sku_id VARCHAR(20),
	size FLOAT,
	price INT,
	product_condition ENUM('new_no_defects', 'used', 'new_with_defects'),
	trending BOOLEAN,
	top_seller BOOLEAN,
	new_release BOOLEAN,
	top_collab BOOLEAN,
	price_drop BOOLEAN,
    FOREIGN KEY (sku_id) REFERENCES model(sku_id)
);

CREATE TABLE stockx_product (
	id INT PRIMARY KEY,
    sku_id VARCHAR(20),
	size FLOAT,
	price INT,
	recently_sold INT,
	annual_sold INT,
	retail_price INT,
	highest_bid INT,
	annual_high_price INT,
	annual_low_price INT,
	average_price INT,
	volatility FLOAT, 
	number_of_asks INT,
	number_of_bids INT,
    FOREIGN KEY (sku_id) REFERENCES model(sku_id)
);

CREATE TABLE goat_product (
	id INT PRIMARY KEY,
    sku_id VARCHAR(20),
	size FLOAT,
	price INT,
	product_condition ENUM('new_no_defects', 'used', 'new_with_defects', 'goat_clean'),
	trending BOOLEAN,
	just_dropped BOOLEAN,
    FOREIGN KEY (sku_id) REFERENCES model(sku_id)
);

CREATE TABLE grailed_product (
	id INT PRIMARY KEY,
	sku_id VARCHAR(20),
    model TEXT,
	size FLOAT,
	price INT,
	product_condition ENUM('is_not_specified', 'is_gently_used', 'is_new', 'is_used', 'is_worn'),
	category TEXT,
	old_price INT,
	date_bumped VARCHAR(10),
	date_created VARCHAR(10),
	heat INT,
	seller_location VARCHAR(30),
	seller_rating FLOAT, 
	seller_rating_count INT,
	shipping_us INT,
	shipping_ca INT,
	shipping_uk INT,
	shipping_eu INT,
	shipping_asia INT,
	shipping_au INT,
	shipping_other INT,
    FOREIGN KEY (sku_id) REFERENCES model(sku_id)
);


CREATE TABLE person (
	user_id text,
	display_name text,
    email text,
    PRIMARY KEY (sku_id)
);

CREATE TABLE person_model (
	user_id text,
    sku_id VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES person(user_id),
    FOREIGN KEY (sku_id) REFERENCES model(sku_id)
);