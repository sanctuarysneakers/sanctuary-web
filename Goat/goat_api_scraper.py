import requests
from urllib.parse import urlencode


def run_scraper():
    url = "https://2fwotdvm2o-dsn.algolia.net/1/indexes/product_variants_v2/query"
    params = {
        "x-algolia-agent": "Algolia for vanilla JavaScript 3.25.1",
        "x-algolia-application-id": "2FWOTDVM2O",
        "x-algolia-api-key": "ac96de6fef0e02bb95d433d8d5c7038a"
    }

    items = []
    sizes = ['6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','13','13.5','14','14.5','15','16']
    for size in sizes:
        post_json = {
            "params": "query=&" + urlencode({
                "distinct": "true",
                "query": "Air Jordan",
                "facetFilters": "(product_category: shoes), (presentation_size:"+size+"), (single_gender: men)",
                "offset": "0",
                "length": "1000"
            })
        }
        response = requests.post(url, params=params, json=post_json)
        resp_json = response.json()

        hits = resp_json['hits']
        for hit in hits:
            item = {
                'id': hit['objectID'],
                'model': hit['name'],
                'size': size,
                'category': hit['silhouette'],
                'nickname': hit['nickname'],
                'shoe_condition': hit['shoe_condition'],
                'lowest_price_usd': hit['lowest_price_cents']/100,
                'lowest_price_cad': hit['lowest_price_cents_cad']/100,
                'url': 'https://www.goat.com/sneakers/' + hit['slug'],
                'image': hit['main_picture_url'] 
            }
            items.append(item)

    return items


print(run_scraper())