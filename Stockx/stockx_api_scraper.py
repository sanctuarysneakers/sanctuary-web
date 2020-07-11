import requests
from urllib.parse import urlencode
import sqlite3
from sqlite3 import OperationalError, IntegrityError


def get_api_data():
    url = "https://stockx.com/api/browse"
    headers = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"}
    
    items = []
    page = 1
    while page <= 25:
        parameters = {
            "_tags": "air jordan",
            "productCategory": "sneakers",
            "shoeSize": "12",
            "sort": "deadstock_sold",
            "order": "DESC",
            "page": str(page)
        }
        response = requests.get(url, headers=headers, params=parameters)
        feed = response.json()["Products"]
        for item in feed:
            item_data = {
                "id": item["tickerSymbol"],
                "model": item["title"],
                "size": item["shoeSize"],
                "category": item["category"],
                "retailPrice": item["retailPrice"],
                "pricePremium": item["market"]["pricePremium"],
                "lowestAsk": item["market"]["lowestAsk"],
                "highestBid": item["market"]["highestBid"],
                "annualHigh": item["market"]["annualHigh"],
                "annualLow": item["market"]["annualLow"],
                "averagePrice": item["market"]["averageDeadstockPrice"],
                "averagePriceRank": item["market"]["averageDeadstockPriceRank"],
                "volatility": item["market"]["volatility"],
                "numberOfAsks": item["market"]["numberOfAsks"],
                "numberOfBids": item["market"]["numberOfBids"],
                "annualSold": item["market"]["deadstockSold"],
                "url": "stockx.com/" + item["urlKey"],
                "image": item["media"]["imageUrl"]
            }
            items.append(item_data)
        
        page += 1

    return items

get_api_data()
