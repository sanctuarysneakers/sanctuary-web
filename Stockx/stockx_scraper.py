from bs4 import BeautifulSoup
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
import time

options = Options()
options.add_argument("--start-maximized")
driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)


def get_item_info(item):
    info = {'brand': 'Air Jordan', 'url': 'https://stockx.com' + item.find('a')['href'], 'size': 'Multiple sizes',
            'model': item.find('div', {'class': 'PrimaryText-m2st9e-0 hugwvm'}).text,
            'price': item.find('div', {'class': 'PrimaryText-m2st9e-0 feUFro'}).text, 'img': 'Lazy loaded'}
    return info


def insert_items(feed):
    for item in feed:
        print(get_item_info(item))


def verify_human():
    print("They detected we are using automated software")


def run_scraper():
    i = 1
    while i <= 25:
        driver.get('https://stockx.com/retro-jordans?page=' + str(i))
        time.sleep(3.0)
        page_html = driver.page_source
        soup = BeautifulSoup(page_html, "lxml")
        time.sleep(1.0)
        automation_check = soup.find('title').text
        if automation_check == 'Access to this page has been denied.':
            verify_human()
        feed = soup.find_all('div', {'class': 'tile browse-tile updated'})
        insert_items(feed)
        time.sleep(1.0)
        i += 1


run_scraper()
