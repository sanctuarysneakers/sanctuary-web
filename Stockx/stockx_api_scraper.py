import requests
from urllib.parse import urlencode
import sqlite3
from sqlite3 import OperationalError, IntegrityError


def get_api_data():
    url = "https://stockx.com/api/browse"
    
    headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"}
    
    parameters = {
        "_tags": "air jordan",
        "productCategory": "sneakers",
        "shoeSize": "12",
        "sort": "deadstock_sold",
        "order": "DESC",
        "page": "1"
    }

    response = requests.get(url, headers=headers, params=parameters)
    items = response.json()['Products']

    for item in items:
        print("Model: " + item["title"])
        print("Category: " + item["category"])
        print("Lowest Asking Price: $" + str(item["market"]["lowestAsk"]))
        print("Annual Low/High: $" + str(item["market"]["annualLow"]) + "/$" + str(item["market"]["annualHigh"])),
        print("Average Price: $" + str(item["market"]["averageDeadstockPrice"]))
        print("\n")

get_api_data()
