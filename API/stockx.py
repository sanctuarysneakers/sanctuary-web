import requests
from urllib.parse import urlencode


def get_data(search_query, shoe_size, price_low, price_high, page, page_len):
    url = "https://stockx.com/api/browse"
    headers = {
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36",
        "referer": "https://stockx.com",
        "accept": "*/*",
        "appos": "web",
        "appversion": "0.1"
    }

    parameters = {
        "productCategory": "sneakers",
        "_search": search_query,
        "gender": "men",
        "shoeSize": shoe_size,
        "market.lowestAsk": f"range({price_low}|{price_high})",
        "page": page
    }
    response = requests.get(url, headers=headers, params=parameters)
    response.raise_for_status()
    request_data = response.json()["Products"]

    results = []
    for item in request_data:
        if len(results) >= page_len:
            break
        results.append({
            "id": abs(hash(item["objectID"]) % (10**7)),
            "source": "StockX",
            "model": item["title"],
            "sku_id": item["styleId"],
            "size": float(shoe_size),
            "price": item["market"]["lowestAsk"],
            "shoe_condition": item["condition"],
            "category": item["category"],
            "url": "stockx.com/" + item["urlKey"],
            "image": item["media"]["imageUrl"],
            "image_thumbnail": item["media"]["imageUrl"].split('?', 1)[0] + "?w=400&q=50&trim=color"
        })

    return results
