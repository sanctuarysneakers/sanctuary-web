import time
from selenium import webdriver
from Sneaker import Sneaker
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
chrome_options.add_argument("--start-maximized")
driver = webdriver.Chrome('C:\\Users\\erich\\OneDrive\\Desktop\\Misc\\sole_steal\\chromedriver', options=chrome_options)
driver.get('https://www.grailed.com/designers/jordan-brand/hi-top-sneakers')

sneakers = []

# Find number of sneakers that we will scrape from grailed
sneaker_count = driver.find_element_by_xpath('/html/body/div[3]/div[6]/div[3]/div[2]/div[1]/div[1]/div/span')
sneaker_count = int(sneaker_count.text.replace(",", "").split()[0])

# Get scroll height
last_height = driver.execute_script("return document.body.scrollHeight")

while True and len(sneakers) < sneaker_count:
    # Scroll down to bottom
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

    # Get sneakers currently on page and add to sneakers list
    feed = driver.find_elements_by_class_name('feed-item')
    for item in feed:
        split = item.text.strip().split('\n')
        if len(split) > 3:
            sneaker = Sneaker(split[1], split[2], split[3], split[4])
            sneakers.append(sneaker)

    # Wait to load page
    time.sleep(0.5)

    # Calculate new scroll height and compare with last scroll height
    new_height = driver.execute_script("return document.body.scrollHeight")
    if new_height == last_height:
        break
    last_height = new_height
