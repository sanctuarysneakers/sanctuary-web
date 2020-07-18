import requests
from urllib.parse import urlencode


def run_scraper():
    url = "https://2fwotdvm2o-dsn.algolia.net/1/indexes/product_variants_v2/query"

    params = {
        "x-algolia-agent": "Algolia for vanilla JavaScript 3.25.1",
        "x-algolia-application-id": "2FWOTDVM2O",
        "x-algolia-api-key": "ac96de6fef0e02bb95d433d8d5c7038a"
    }

    post_json = {
        "params": "query=&" + urlencode({
            "distinct": "true",
            "query": "Air Jordan",
            "facetFilters": "(product_category: shoes), (presentation_size: 11), (single_gender: men)",
            "offset": "0",
            "length": "1000"
        })
    }

    response = requests.post(url, params=params, json=post_json)
    resp_json = response.json()

    items = resp_json['hits']

    for item in items:
        print(item['name'], item['size'])
        print()


run_scraper()