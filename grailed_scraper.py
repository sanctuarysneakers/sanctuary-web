import time
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
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
        images = WebDriverWait(driver, 10).until(
            EC.visibility_of_all_elements_located((By.CSS_SELECTOR, ".feed-item .listing-cover-photo>img")))
        print(len(images))
        for image in images:
            print(image.get_attribute("src"))
        for item in feed:
            info = item.get_attribute('innerHTML').split(">")
            item_url = info[0]
            item_url = "https://www.grailed.com" + item_url[9:-43]

            # Create Sneaker object for this pair of shoes
            split = item.text.strip().split('\n')
            if len(split) > 3:
                sneaker = Sneaker(split[1], split[2], split[3], split[4], item_url, None)
                sneakers.append(sneaker)
        # Wait to load page
        time.sleep(0.5)

        # Calculate new scroll height and compare with last scroll height
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height

    return sneakers


x = get_sneakers()
