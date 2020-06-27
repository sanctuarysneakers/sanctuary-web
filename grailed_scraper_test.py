from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get('https://www.grailed.com/designers/jordan-brand/hi-top-sneakers')


def get_sneakers():

    SCROLL_PAUSE_TIME = 0.5

    # Get scroll height
    last_height = driver.execute_script("return document.body.scrollHeight")
    
    # Amount of scrolls to the bottom of page
    scrolls = 10

    i = 0
    while (i < scrolls):
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

    time.sleep(2)

    # Get all the shoe html items (there are about 40 per page scroll)
    shoe_items = driver.find_elements(By.CSS_SELECTOR, 'div.feed-item')

    # Print the number of shoes
    print(len(shoe_items))

get_sneakers()

driver.quit()