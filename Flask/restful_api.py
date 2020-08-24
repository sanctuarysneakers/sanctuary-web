from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
import mysql.connector
from mysql.connector import ProgrammingError


def connect_to_db():
    host = "mysql-db-master.cmamugrum56i.us-west-2.rds.amazonaws.com"
    user = "admin"
    passwd = "4tDqfnvbQ8R8RGuh"
    db_name = "sneakers"
    try:
        connection = mysql.connector.connect(host=host, user=user, passwd=passwd, database=db_name)
        cursor = connection.cursor(dictionary=True)
        cursor.execute("USE sneakers;")
    except ProgrammingError:
        print("couldn't connect to database")
    return connection, cursor


conn, c = connect_to_db()

application = Flask(__name__)
cors = CORS(application, resources={r"*": {"origins": "*"}})
api = Api(application)


parser = reqparse.RequestParser()
parser.add_argument('source', type=str, default='stockx')
parser.add_argument('search', type=str, default='jordan')
parser.add_argument('size', type=float, default=10)
parser.add_argument('price_low', type=int, default=100)
parser.add_argument('price_high', type=int, default=10000)
parser.add_argument('page', type=int, default=0)
parser.add_argument('email', type=str)


class Search(Resource):

    def get(self):
        global conn, c

        args = parser.parse_args()
        source = args['source'].lower()
        search = format_search_query(args['search'].lower())
        size = args['size']
        price_low = args['price_low']
        price_high = args['price_high']

        limit = 40
        offset = args['page'] * limit

        is_default = True if search == 'jordan' else False

        if source == "goat":
            query = f"""SELECT *, MATCH(model) AGAINST('{search}') AS m_score
                        FROM goat_sneakers
                        WHERE MATCH(model) AGAINST('{search}') AND size={size} AND price>{price_low} AND price<{price_high}
                        ORDER BY 10*m_score + 10*trending DESC
                        LIMIT {limit} OFFSET {offset};"""
        elif source == "stockx":
            order_by = 'ORDER BY SUM(recently_sold) DESC' if is_default else ''
            query = f"""SELECT *
                        FROM stockx_sneakers
                        WHERE MATCH(model) AGAINST('{search}' IN BOOLEAN MODE) AND size={size} AND price>{price_low} AND price<{price_high}
                        GROUP BY model
                        {order_by}
                        LIMIT {limit} OFFSET {offset};"""
        elif source == "grailed":
            order_by = 'ORDER BY heat DESC, date_bumped DESC' if is_default else ''
            query = f"""SELECT *
                        FROM grailed_sneakers
                        WHERE MATCH(model) AGAINST('{search}' IN BOOLEAN MODE) AND size={size} AND price>{price_low} AND price<{price_high}
                        {order_by}
                        LIMIT {limit} OFFSET {offset};"""
        elif source == "flightclub":
            query = f"""SELECT *
                        FROM flightclub_sneakers
                        WHERE MATCH(model) AGAINST('{search}' IN BOOLEAN MODE) AND size={size} AND price>{price_low} AND price<{price_high}
                        GROUP BY model
                        LIMIT {limit} OFFSET {offset};"""
        else:
            return {"Error": "Enter a correct source name"}
        
        try:
            c.execute(query)
        except:
            conn, c = connect_to_db()
            c.execute(query)
        data = c.fetchall()
        conn.commit()
        return data


class Emails(Resource):

    def get(self):
        global conn, c
        args = parser.parse_args()
        email = args['email']
        query = "INSERT IGNORE INTO email_list (email) VALUES ('{}')".format(email)
        try:
            c.execute(query)
        except:
            conn, c = connect_to_db()
            c.execute(query)
        conn.commit()


def format_search_query(string):
    if len(string) < 5:
        return string

    try:
        idx = string.index("air")
        newstr = string[:idx] + '~' + string[idx:]
        return newstr
    except ValueError:
        return string


api.add_resource(Search, '/')
api.add_resource(Emails, '/emails')
  
if __name__ == '__main__':
    application.run(debug=True)
    # application.run(host='0.0.0.0')   # For production
