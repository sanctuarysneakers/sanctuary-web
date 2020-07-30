from flask import Flask
from flask_restful import Resource, Api, reqparse
import mysql.connector
from mysql.connector import ProgrammingError


def connect_to_db():
    host = "test-database-1.cmamugrum56i.us-west-2.rds.amazonaws.com"
    user = "admin"
    passwd = "password"
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
api = Api(application)

parser = reqparse.RequestParser()
parser.add_argument('source', default='stockx')
parser.add_argument('size', type=int)
parser.add_argument('price_low', type=int, default=0)
parser.add_argument('price_high', type=int, default=1000)
parser.add_argument('page', type=int, default=0)


class Search(Resource):

    def get(self):
        global conn, c

        args = parser.parse_args()
        source = args['source']
        size = args['size']
        price_low = args['price_low']
        price_high = args['price_high']
        offset = args['page']*1000

        if size is None:
            query = """SELECT * FROM {}_sneakers 
                       WHERE price >= {} AND price <= {}
                       LIMIT 1000 OFFSET {};""".format(source, price_low, price_high, offset)
        else:
            query = """SELECT * FROM {}_sneakers 
                       WHERE size={} AND price >= {} AND price <= {}
                       LIMIT 1000 OFFSET {};""".format(source, size, price_low, price_high, offset)
        
        try:
            c.execute(query)
        except:
            conn, c = connect_to_db()
            c.execute(query)
        data = c.fetchall()
        return data


api.add_resource(Search, '/')
  
if __name__ == '__main__':
    application.run(debug=True)
    # application.run(host='0.0.0.0')   # For production
