from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import time
import pandas as pd

driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get('https://www.grailed.com/designers/jordan-brand/hi-top-sneakers')


def scroll_to_bottom(page_scrolls):
    SCROLL_PAUSE_TIME = 0.5

    # Get scroll height
    last_height = driver.execute_script("return document.body.scrollHeight")
    
    # Amount of scrolls to the bottom of page
    i = 0
    while (i < page_scrolls):
        # Scroll down to bottom
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

        # Wait to load page
        time.sleep(SCROLL_PAUSE_TIME)

        # Calculate new scroll height and compare with last scroll height
        new_height = driver.execute_script("return document.body.scrollHeight")
        if (new_height == last_height):
            break
        last_height = new_height

        i += 1

def get_sneaker_info(feed):
    # Make a dict for each item and store in the items list
    items = []
    item_id = 0
    for item in feed:
        # Item dict contains information
        item_obj = {}

        item_obj["Id"] = item_id
        item_id += 1

        # Get brand
        brand = item.find_element_by_xpath(".//p[@class='listing-designer truncate']").text
        item_obj["Brand"] = brand

        # Get model
        model = item.find_element_by_xpath(".//p[@class='truncate listing-title']").text
        item_obj["Model"] = model

        # Get size
        size = item.find_element_by_xpath('.//p[@class="listing-size sub-title"]').text
        item_obj["Size"] = size

        # Get current price and old price
        try:
            price = item.find_element_by_xpath('.//p[@class="sub-title original-price"]').text
            old_price = ""
        except NoSuchElementException:
            price = item.find_element_by_xpath('.//p[@class="sub-title new-price"]').text
            old_price = item.find_element_by_xpath('.//p[@class="sub-title original-price strike-through"]').text
        item_obj["Current Price"] = price
        item_obj["Old Price"] = old_price

        # Get link
        link = item.find_element_by_xpath('./a').get_attribute("href")
        item_obj["Link"] = link

        # Get image (doesn't work for all items)
        try:
            img = item.find_element_by_xpath(".//div[@class='listing-cover-photo ']/img").get_attribute("src")
        except NoSuchElementException:
            img = "N/A"
        item_obj["Image"] = img

        items.append(item_obj)
    
    return items

def get_sneakers():

    # Scroll to the bottom 10 times
    scroll_to_bottom(10)
    
    # Get all the feed items (there are about 40 per page scroll)
    feed = driver.find_elements_by_xpath("//div[@class='feed-item']")
    
    # Get a list of dicts with info for each item
    items = get_sneaker_info(feed)

    # Put all the items data into a Pandas dataframe
    items_df = pd.DataFrame(items)

    # Convert the items dataframe into a csv
    items_df.to_csv("sneakers.csv", index=False, header=True)

get_sneakers()

driver.quit()
