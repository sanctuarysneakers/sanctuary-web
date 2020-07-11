from bs4 import BeautifulSoup
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from selenium.webdriver.common.by import By

driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get('https://www.flightclub.com/air-jordans')


def get_item_info(item):
    info = {'brand': 'Air Jordan', 'url': 'https://www.flightclub.com' + item['href'], 'img': item.find('img')['src'],
            'model': item.find('h2').text, 'price': item.find('div', {'class': 'yszfz8-5 kbsRqK'}).text,
            'size': 'Multiple sizes', 'Source': 'Flight Club'}
    return info


def insert_items(feed):
    for item in feed:
        print(get_item_info(item))


def run_scraper():
    page_html = driver.page_source
    first_page = BeautifulSoup(page_html, "lxml")
    num_shoes = first_page.find('span', {'class': 'kw3ij0-1 teOWb'})
    num_shoes = int(num_shoes.text)
    num_scraped = 0
    next_btn = driver.find_element_by_css_selector('.dIgQsa')
    while num_scraped <= num_shoes:
        page_html = driver.page_source
        soup = BeautifulSoup(page_html, "lxml")
        feed = soup.find_all('a', {'class': 'sc-12adlsx-0 iSXeRZ'})
        insert_items(feed[1:])
        num_scraped += len(feed[1:])
        next_btn.click()


run_scraper()
