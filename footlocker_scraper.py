import time
import pandas as pd
import urllib3
from selenium import webdriver
from Sneaker import Sneaker
from selenium.webdriver.chrome.options import Options


def get_sneakers():
    """ Returns a list containing all the Air Jordan Sneakers currently listed on Grailed.

    Returns:
    List[Sneaker]: A list of Sneaker objects that are currently live on Grailed.
    """

    chrome_options = Options()
    chrome_options.add_argument("--start-maximized")
    driver = webdriver.Chrome('C:\\Users\\erich\\OneDrive\\Desktop\\Misc\\sole_steal\\chromedriver',
                              options=chrome_options)
    driver.get('https://www.footlocker.ca/en/category/brands/jordan.html')
    print("hello")
    sneakers = []
    sneaker_count = driver.find_elements_by_css_selector('Heading-main font-caption')
    print(sneaker_count)
    return sneakers


x = get_sneakers()
