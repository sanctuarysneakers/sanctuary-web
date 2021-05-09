from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
from scrapers import *

application = Flask(__name__)
cors = CORS(application, resources={r"*": {"origins": "*"}})
api = Api(application)


# Specify request query parameters
parser = reqparse.RequestParser()
parser.add_argument('source', type=str)
parser.add_argument('sku', type=str, default='')
parser.add_argument('model', type=str, default='')
parser.add_argument('size', type=str, default='10')
parser.add_argument('ship_to', type=str, default='CA')


class LowestNewPrices(Resource):
	def get(self):
		args = parser.parse_args()
		source = args['source']
		sku = args['sku']
		model = args['model']
		size = args['size']
		ship_to = args['ship_to']

		if source == 'ebay':
			query = model + ' ' + sku
			return ebay_lowest_price(query, size, ship_to)
		elif source == 'depop':
			return depop_lowest_price(model, size)
		# elif source == 'sneakercon':
		# 	return sneakercon_lowest_price(sku, size)


class ItemListings(Resource):
	def get(self):
		args = parser.parse_args()
		source = args['source']
		sku = args['sku']
		model = args['model']
		size = args['size']
		ship_to = args['ship_to']

		if source == 'ebay':
			query = model + ' ' + sku
			return ebay_used(query, size, ship_to)
		elif source == 'depop':
			return depop_used(model, size)


# Set API endpoints
api.add_resource(LowestNewPrices, '/lowestnewprices')
api.add_resource(ItemListings, '/itemlistings')

if __name__ == '__main__':
	application.run(debug=True)        # local dev
	#application.run(host='0.0.0.0')    # production