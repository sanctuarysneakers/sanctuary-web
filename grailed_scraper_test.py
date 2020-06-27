from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as ec

import time

chrome_options = Options()
chrome_options.add_argument("--start-maximized")
driver = webdriver.Chrome(ChromeDriverManager().install(), options=chrome_options)
driver.get('https://www.grailed.com/designers/jordan-brand/hi-top-sneakers')


def get_sneakers():

    SCROLL_PAUSE_TIME = 0.5

    # Get scroll height
    last_height = driver.execute_script("return document.body.scrollHeight")
    
    # Amount of scrolls to the bottom of page
    scrolls = 10
    sneakers = []
    while len(sneakers) < 22378:
        i = 0
        while i < scrolls:
            # Scroll down to bottom
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

            # Wait to load page
            time.sleep(SCROLL_PAUSE_TIME)

            # Calculate new scroll height and compare with last scroll height
            new_height = driver.execute_script("return document.body.scrollHeight")
            if new_height == last_height:
                break
            last_height = new_height

            i += 1

        time.sleep(2)

        # Get all the shoe html items (there are about 40 per page scroll)
        feed = driver.find_elements(By.CSS_SELECTOR, 'div.feed-item')
        shoe_images = driver.find_elements(By.CSS_SELECTOR, 'div.listing-cover-photo img')
        for item in feed:
            img_div = item.find_element_by_class_name('listing-cover-photo ')
            img = WebDriverWait(img_div, 10).until(
                ec.visibility_of_element_located((By.TAG_NAME, 'img')))
            print(img.get_attribute('src'))
        # Print the number of shoes
        print(len(feed), len(shoe_images))


    # TODO: loop through all the shoe_items and create a Sneaker object for each one 

get_sneakers()

driver.quit()
