import time
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver import ActionChains
from selenium.webdriver.chrome.options import Options

options = Options()
options.add_argument("--start-maximized")
driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)
driver.get('https://www.goat.com/search?query=Air%20jordan')
actions = ActionChains(driver)


def close_popup():
    time.sleep(2.0)
    popup_close = WebDriverWait(driver, 10).until(
        ec.visibility_of_element_located(
            (By.CLASS_NAME,
             'goat-button secondary align-center-justify-center ChangeCurrencyModal__Button-sc-17cfdax-4 fpAmCQ')))
    actions.double_click(popup_close).perform()


def insert_items(feed):
    for item in feed:
        print(item)


def run_scraper():
    time.sleep(2.0)
    close_popup()
    page_html = driver.page_source
    soup = BeautifulSoup(page_html, "lxml")
    feed = soup.find_all('div', {'class': 'Grid__CellWrapper-sc-1njij7e-0 bboBZL'})
    print('hey', feed)
    insert_items(feed)


run_scraper()