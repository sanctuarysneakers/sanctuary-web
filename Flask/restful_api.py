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
parser.add_argument('size', type=int)
parser.add_argument('price_low', type=int, default=0)
parser.add_argument('price_high', type=int, default=1000)
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
        offset = args['page']*100

        size_str = '>0' if size is None else '={}'.format(size)

        if source == "goat":
            query = f"""SELECT *
                        FROM (SELECT * FROM goat_sneakers
                            WHERE MATCH(model) AGAINST('{search}') AND size{size_str} AND price>{price_low} AND price<{price_high}
                            GROUP BY model) t
                        ORDER BY trending DESC, just_dropped DESC
                        LIMIT 100 OFFSET {offset};"""
        elif source == "stockx":
            query = f"""SELECT *
                        FROM stockx_sneakers
                        WHERE MATCH(model) AGAINST('{search}') AND size{size_str} AND price>{price_low} AND price<{price_high}
                        GROUP BY model
                        ORDER BY SUM(recently_sold) DESC
                        LIMIT 100 OFFSET {offset};"""
        elif source == "grailed":
            query = f"""SELECT *
                        FROM grailed_sneakers
                        WHERE MATCH(model) AGAINST('{search}') AND size{size_str} AND price>{price_low} AND price<{price_high}
                        ORDER BY heat DESC, date_bumped DESC
                        LIMIT 100 OFFSET {offset};"""
        elif source == "flightclub":
            query = f"""SELECT *
                        FROM flightclub_sneakers
                        WHERE MATCH(model) AGAINST('{search}') AND size{size_str} AND price>{price_low} AND price<{price_high} AND sku_id IS NOT NULL
                        GROUP BY model
                        LIMIT 100 OFFSET {offset};"""
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
