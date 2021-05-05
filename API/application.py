from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
from scrapers import *

application = Flask(__name__)
cors = CORS(application, resources={r"*": {"origins": "*"}})
api = Api(application)


# Specify request query parameters
parser = reqparse.RequestParser()
parser.add_argument('text', type=str, default='test')

class Search(Resource):
	def get(self):
		args = parser.parse_args()
		text = args['text']

		return {"text": text}


# Set API endpoints
api.add_resource(Search, '/')

if __name__ == '__main__':
	application.run(debug=True)        # debugging
	#application.run(host='0.0.0.0')    # production