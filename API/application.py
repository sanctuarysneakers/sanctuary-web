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
parser.add_argument('search', type=str)
parser.add_argument('size', type=str)
parser.add_argument('ship_to', type=str, default='CA')

class GetPrice(Resource):
	def get(self):
		args = parser.parse_args()
		source = args['source']
		search = args['search']
		size = args['size']
		ship_to = args['ship_to']

		if source == 'ebay':
			return ebay_lowest_price(search, size, ship_to)
		elif source == 'depop':
			return depop_lowest_price(search, size)
		elif source == 'sneakercon':
			return sneakercon_lowest_price(search, size)


# Set API endpoints
api.add_resource(GetPrice, '/getprice')

if __name__ == '__main__':
	application.run(debug=True)        # debugging
	#application.run(host='0.0.0.0')    # production