from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
from scrapers import *
from forex_python.converter import CurrencyRates

application = Flask(__name__)
cors = CORS(application, resources={r"*": {"origins": "*"}})
api = Api(application)


# Specify request query parameters
parser = reqparse.RequestParser()
parser.add_argument('source', type=str, default='stockx')
parser.add_argument('search', type=str, default='')
parser.add_argument('size', type=str, default='10')
parser.add_argument('ship_to', type=str, default='US')
parser.add_argument('page', type=int, default=1)
parser.add_argument('from_curr', type=str, default='USD')
parser.add_argument('to_curr', type=str)


def bad_request():
	return {"error": "bad request"}, 400


class Browse(Resource):
	def get(self):
		args = parser.parse_args()
		search = args['search']
		# page = args['page']

		# results = browse_stockx(search, page)
		results = browse_es(search)
		return results if results else bad_request()


class LowestPrice(Resource):
	def get(self):
		args = parser.parse_args()
		source = args['source']
		search = args['search']
		size = args['size']
		ship_to = args['ship_to']

		if source == 'stockx':
			results = stockx_lowest_price(search, size)
			return results if results else bad_request()
		elif source == 'ebay':
			results = ebay_lowest_price(search, size, ship_to)
			return results if results else bad_request()


class ItemListings(Resource):
	def get(self):
		args = parser.parse_args()
		source = args['source']
		search = args['search']
		size = args['size']
		ship_to = args['ship_to']

		if source == 'ebay':
			results = ebay_listings(search, size, ship_to)
			return results if results else bad_request()
		elif source == 'depop':
			results = depop_listings(search, size)
			return results if results else bad_request()


def currency_rate(from_curr, to_curr):
	c = CurrencyRates()
	return c.get_rate(from_curr, to_curr)

class CurrencyRate(Resource):
	def get(self):
		args = parser.parse_args()
		from_curr = args['from_curr']
		to_curr = args['to_curr']
		return currency_rate(from_curr, to_curr)


# Set API endpoints
api.add_resource(Browse, '/browse')
api.add_resource(LowestPrice, '/lowestprice')
api.add_resource(ItemListings, '/itemlistings')
api.add_resource(CurrencyRate, '/currencyrate')

if __name__ == '__main__':
	#application.run(debug=True)        # local dev
	application.run(host='0.0.0.0')    # production