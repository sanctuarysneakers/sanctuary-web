from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver import ActionChains
from webdriver_manager.chrome import ChromeDriverManager
import time

driver = webdriver.Chrome(ChromeDriverManager().install())
driver.get('https://stockx.com/retro-jordans')


def insert_items(feed):
    for item in feed:
        print(item)


def verify_human(page_html, soup):
    action = ActionChains(driver)
    # action.click_and_hold(on_element = element)
    # action.perform()
    paragraph = driver.find_element_by_xpath('/html/body/div/div[2]/p')
    print(paragraph)


def run_scraper():
    i = 1
    while i <= 25:
        driver.get('https://stockx.com/retro-jordans?page=' + str(i))
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
