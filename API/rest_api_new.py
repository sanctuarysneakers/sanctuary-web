from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
import mysql.connector
from mysql.connector import ProgrammingError
import requests
from datetime import datetime

import grailed
import stockx
import goat
import flightclub

application = Flask(__name__)
cors = CORS(application, resources={r"*": {"origins": "*"}})
api = Api(application)


def connect_to_db():
    host = "mysql-db-master.cmamugrum56i.us-west-2.rds.amazonaws.com"
    user = "admin"
    passwd = "4tDqfnvbQ8R8RGuh"
    db_name = "sneakers"
    try:
        connection = mysql.connector.connect(host=host, user=user, passwd=passwd, database=db_name)
        cursor = connection.cursor(dictionary=True) # Returns data in a dictonary
        cursor.execute("USE sneakers;")
        return connection, cursor
    except ProgrammingError:
        print("couldn't connect to database")

# Set up connection to database and initialize cursor
conn, c = connect_to_db()


# Processes return data
def process_data(data, currency):
    # Change price currency if not USD
    if currency == 'USD':
        return data
    rate = currency_rate(currency)
    for item in data:
        item["price"] = round(rate * item["price"])
    return data

# Gets conversion rate of a currency from USD
def currency_rate(currency):
    req = requests.get(f'https://api.exchangeratesapi.io/latest?symbols={currency}&base=USD')
    rates = req.json()['rates']
    return rates[currency]


# Add request parameters to the parser
parser = reqparse.RequestParser()
parser.add_argument('source', type=str, default='stockx')
parser.add_argument('search', type=str, default='')
parser.add_argument('size', type=str, default='10')
parser.add_argument('price_low', type=int, default=0)
parser.add_argument('price_high', type=int, default=100000)
parser.add_argument('page', type=int, default=0)
parser.add_argument('currency', type=str, default='USD')
parser.add_argument('email', type=str)
parser.add_argument('sku', type=str)
parser.add_argument('model', type=str)


# Main search resource for returning data
class Search(Resource):
    def get(self):
        global conn, c

        # Get request parameters
        args = parser.parse_args()
        source = args['source'].lower()
        search = args['search']
        size = args['size']
        price_low = args['price_low']
        price_high = args['price_high']
        currency = args['currency']

        # Page number and element limit
        page = args['page']
        limit = 20

        if source == "grailed":
            sort = "trending"
            data = grailed.get_data(search, size, price_low, price_high, sort, page, limit)
            return process_data(data, currency)
        elif source == "stockx":
            data = stockx.get_data(search, size, price_low, price_high, page+1, limit)
            return process_data(data, currency)
        elif source == "goat":
            data = goat.get_data(search, size, price_low, price_high, page, limit)
            return process_data(data, currency)
        elif source == "flightclub":
            data = flightclub.get_data(search, size, price_low, price_high, page, limit)
            return process_data(data, currency)
        else:
            return {"Error": "Enter a correct source name"}

        # Get request information and store in the ip_log table
        #request_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        #request_ip = request.environ['HTTP_X_FORWARDED_FOR']
        #request_id = abs(hash(request_date+' '+request_ip)) % (10**8)
        #c.execute(f"INSERT IGNORE INTO ip_log (id, date, ip, search_query) VALUES ({request_id}, '{request_date}', '{request_ip}', '{search}');")
        #conn.commit()


# Comparison feature resource
class Compare(Resource):
    def get(self):
        global conn, c

        # Get request parameters
        args = parser.parse_args()
        source = args['source'].lower()
        sku = args['sku']
        model = args['model']
        size = args['size']
        price_low = args['price_low']
        price_high = args['price_high']
        currency = args['currency']

        # Page number and element limit
        page = 0
        limit = 1

        if source == "stockx":
            data = []
            data.extend(goat.get_data(sku, size, price_low, price_high, page, limit))
            data.extend(flightclub.get_data(sku, size, price_low, price_high, page, limit))
            return data
        elif source == "goat":
            data = []
            data.extend(stockx.get_data(sku, size, price_low, price_high, page+1, limit))
            data.extend(flightclub.get_data(sku, size, price_low, price_high, page, limit))
            return process_data(data, currency)
        elif source == "flightclub":
            data = []
            data.extend(goat.get_data(sku, size, price_low, price_high, page, limit))
            data.extend(stockx.get_data(sku, size, price_low, price_high, page+1, limit))
            return process_data(data, currency)
        else:
            return {"Error": "Enter a correct source name"}

        # TODO: Grailed


# Email list resource
class Emails(Resource):
    def get(self):
        global conn, c

        # Get email request parameter and create SQL query
        args = parser.parse_args()
        email = args['email']
        query = f"INSERT IGNORE INTO email_list (email) VALUES ('{email}');"

        # Execute SQL query on the database, re-connect to database if timed out
        try:
            c.execute(query)
        except:
            conn, c = connect_to_db()
            c.execute(query)
        conn.commit()


# Add resources to the API and set endpoints
api.add_resource(Search, '/')
api.add_resource(Compare, '/compare')
api.add_resource(Emails, '/emails')


if __name__ == '__main__':
    #application.run(debug=True)        # For debugging
    application.run(host='0.0.0.0')    # For production