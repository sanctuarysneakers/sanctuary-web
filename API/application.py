from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
from scrapers import *

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


def bad_request():
	return {"error": "bad request"}, 400


class Browse(Resource):
	def get(self):
		args = parser.parse_args()
		search = args['search']
		page = args['page']

		response = browse_stockx(search, page)
		return response if response else bad_request()


class LowestPrice(Resource):
	def get(self):
		args = parser.parse_args()
		source = args['source']
		search = args['search']
		size = args['size']
		ship_to = args['ship_to']

		if source == 'stockx':
			response = stockx_lowest_price(search, size)
			return response if response else bad_request()
		elif source == 'ebay':
			response = ebay_lowest_price(search, size, ship_to)
			return response if response else bad_request()


class ItemListings(Resource):
	def get(self):
		args = parser.parse_args()
		source = args['source']
		search = args['search']
		size = args['size']
		ship_to = args['ship_to']

		if source == 'ebay':
			response = ebay_listings(search, size, ship_to)
			return response if response else bad_request()
		elif source == 'depop':
			response = depop_listings(search, size)
			return response if response else bad_request()


# Set API endpoints
api.add_resource(Browse, '/browse')
api.add_resource(LowestPrice, '/lowestprice')
api.add_resource(ItemListings, '/itemlistings')

if __name__ == '__main__':
	application.run(debug=True)        # local dev
	#application.run(host='0.0.0.0')    # production