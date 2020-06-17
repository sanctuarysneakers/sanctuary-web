from selenium import webdriver
import pandas as pd

driver = webdriver.Chrome('C:\\Users\\erich\\OneDrive\\Desktop\\Misc\\sole_steal\\chromedriver')
driver.get('https://www.grailed.com/designers/jordan-brand/hi-top-sneakers')


class Sneaker:
    def __init__(self, brand, size, model, price):
        self.brand = brand
        self.size = size
        self.model = model
        self.price = price

    def __str__(self):
        return ('Brand: ' + self.brand + '\n' + 'Size: ' + self.size + '\n' + 'Model: ' + self.model + '\n' + 'Price : '
                + self.price)


feed = driver.find_elements_by_class_name('feed-item')
sneakers = []
for item in feed:
    split = item.text.strip().split('\n')
    if len(split) > 3:
        sneaker = Sneaker(split[1], split[2], split[3], split[4])
        sneakers.append(sneaker)
