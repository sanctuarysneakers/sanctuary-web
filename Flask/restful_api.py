from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
import mysql.connector
from mysql.connector import ProgrammingError
import requests
from datetime import datetime

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


# Processes search query
def process_search_query(string):
    if len(string) < 5:
        return string

    # Replace 'air' with '~air' to lower importance for full-text search
    try:
        idx = string.index("air")
        newstr = string[:idx] + '~' + string[idx:]
        return newstr
    except ValueError:
        return string

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
parser.add_argument('search', type=str, default='jordan')
parser.add_argument('size', type=float, default=10)
parser.add_argument('price_low', type=int, default=50)
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
        search = process_search_query(args['search'].lower())
        size = args['size']
        price_low = args['price_low']
        price_high = args['price_high']
        currency = args['currency']

        # Page element limit and offset
        limit = 40
        offset = args['page'] * limit

        # Create SQL query using request parameters for each source
        if source == "goat":
            query = f"""SELECT *, MATCH(model) AGAINST('{search}' IN BOOLEAN MODE) AS m_score, (trending + just_dropped) AS r_score
                        FROM goat_sneakers
                        WHERE MATCH(model) AGAINST('{search}') AND size={size} AND price>={price_low} AND price<={price_high}
                        ORDER BY 5*m_score + r_score DESC
                        LIMIT {limit} OFFSET {offset};"""
        elif source == "stockx":
            query = f"""SELECT *, MATCH(model) AGAINST('{search}' IN BOOLEAN MODE) AS m_score, CAST(recently_sold/300 AS DOUBLE) AS r_score
                        FROM stockx_sneakers
                        WHERE MATCH(model) AGAINST('{search}' IN BOOLEAN MODE) AND size={size} AND price>={price_low} AND price<={price_high}
                        ORDER BY 10*m_score + r_score DESC
                        LIMIT {limit} OFFSET {offset};"""
        elif source == "grailed":
            query = f"""SELECT *, MATCH(model) AGAINST('{search}' IN BOOLEAN MODE) AS m_score, CAST(heat/2500 AS DOUBLE) AS r_score
                        FROM grailed_sneakers
                        WHERE MATCH(model) AGAINST('{search}' IN BOOLEAN MODE) AND size={size} AND price>={price_low} AND price<={price_high}
                        ORDER BY 10*m_score + r_score DESC, date_bumped DESC
                        LIMIT {limit} OFFSET {offset};"""
        elif source == "flightclub":
            query = f"""SELECT *, MATCH(model) AGAINST('{search}' IN BOOLEAN MODE) AS m_score, trending + new_release AS r_score
                        FROM flightclub_sneakers
                        WHERE MATCH(model) AGAINST('{search}' IN BOOLEAN MODE) AND size={size} AND price>{price_low} AND price<{price_high}
                        ORDER BY 5*m_score + r_score DESC
                        LIMIT {limit} OFFSET {offset};"""
        else:
            return {"Error": "Enter a correct source name"}
        
        # Execute SQL query on the database, re-connect to database if timed out
        try:
            c.execute(query)
        except:
            conn, c = connect_to_db()
            c.execute(query)
        
        # Fetch data following query execution (data is a dict)
        data = c.fetchall()
        conn.commit()

        # Get request information and store in the ip_log table
        request_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        request_ip = request.environ['HTTP_X_FORWARDED_FOR']
        request_id = abs(hash(request_date+' '+request_ip)) % (10**8)
        c.execute(f"INSERT IGNORE INTO ip_log (id, date, ip, search_query) VALUES ({request_id}, '{request_date}', '{request_ip}', '{search}');")
        conn.commit()

        # Return data to the caller
        return process_data(data, currency)


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
        currency = args['currency']

        # Create SQL query using request parameters for each source
        if source == "goat":
            query = f"""SELECT id, source, model, sku_id, size, price, image, url FROM stockx_sneakers
                        WHERE sku_id='{sku}' AND size={size}
                        UNION ALL
                        SELECT id, source, model, sku_id, size, price, image, url FROM flightclub_sneakers
                        WHERE sku_id='{sku}' AND size={size};"""
        elif source == "stockx":
            query = f"""SELECT id, source, model, sku_id, size, price, image, url FROM goat_sneakers
                        WHERE sku_id='{sku}' AND size={size}
                        UNION ALL
                        SELECT id, source, model, sku_id, size, price, image, url FROM flightclub_sneakers
                        WHERE sku_id='{sku}' AND size={size};"""
        elif source == "flightclub":
            query = f"""SELECT id, source, model, sku_id, size, price, image, url FROM stockx_sneakers
                        WHERE sku_id='{sku}' AND size={size}
                        UNION ALL
                        SELECT id, source, model, sku_id, size, price, image, url FROM goat_sneakers
                        WHERE sku_id='{sku}' AND size={size};"""
        else:
            return {"Error": "Enter a correct source name"}

        # TODO: Grailed
        
        # Execute SQL query on the database, re-connect to database if timed out
        try:
            c.execute(query)
        except:
            conn, c = connect_to_db()
            c.execute(query)
        
        # Fetch data following query execution (data is a dict)
        data = c.fetchall()
        conn.commit()

        # Return data to the caller
        return process_data(data, currency)


# Add resources to the API and set endpoints
api.add_resource(Search, '/')
api.add_resource(Emails, '/emails')
api.add_resource(Compare, '/compare')


if __name__ == '__main__':
    #application.run(debug=True)       # For debugging
    application.run(host='0.0.0.0')    # For production