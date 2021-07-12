from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
from browse import browse_es
from data_pull import *

application = Flask(__name__)
cors = CORS(application, resources={r"*": {"origins": "*"}})
api = Api(application)

parser = reqparse.RequestParser()
parser.add_argument('source', type=str)
parser.add_argument('search', type=str, default='')
parser.add_argument('size', type=str, default='10')
parser.add_argument('ship_to', type=str, default='US')
parser.add_argument('from_curr', type=str, default='USD')
parser.add_argument('to_curr', type=str)


class Browse(Resource):
	def get(self):
		args = parser.parse_args()
		search = args['search']
		return browse_es(search)


class LowestPrice(Resource):
	def get(self):
		args = parser.parse_args()
		source = args['source']
		search = args['search']
		size = args['size']
		ship_to = args['ship_to']

		if source == 'stockx':
			return stockx_lowest_price(search, size)
		elif source == 'ebay':
			return ebay_lowest_price(search, size, ship_to)


class ItemListings(Resource):
	def get(self):
		args = parser.parse_args()
		source = args['source']
		search = args['search']
		size = args['size']
		ship_to = args['ship_to']

		if source == 'ebay':
			return ebay_listings(search, size, ship_to)
		elif source == 'depop':
			return depop_listings(search, size)


class CurrencyRate(Resource):
	def get(self):
		args = parser.parse_args()
		from_curr = args['from_curr']
		to_curr = args['to_curr']
		return exchange_rate(from_curr, to_curr)


api.add_resource(Browse, '/browse')
api.add_resource(LowestPrice, '/lowestprice')
api.add_resource(ItemListings, '/itemlistings')
api.add_resource(CurrencyRate, '/currencyrate')

if __name__ == '__main__':
	# application.run(debug=True)  # dev
	application.run(host='0.0.0.0')  # prod
