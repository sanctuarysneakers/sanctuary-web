from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver import ActionChains
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
import time

options = Options()
options.add_argument("--start-maximized")
driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)
driver.get('https://stockx.com/retro-jordans')


def insert_items(feed):
    for item in feed:
        print(item)
        info = {}
        info['brand'] = 'Air Jordan'
        info['url'] = 'https://stockx.com/' + item['href']
        print("INFO", info['url'])


def verify_human(page_html, soup):
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
            verify_human(page_html, soup)
        feed = soup.find_all('div', {'class': 'tile browse-tile updated'})
        insert_items(feed)
        time.sleep(1.0)
        i += 1


run_scraper()
