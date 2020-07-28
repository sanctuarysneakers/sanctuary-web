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
        conn = mysql.connector.connect(host=host, user=user, passwd=passwd, database=db_name)
        c = conn.cursor(dictionary=True)
    except ProgrammingError:
        print("couldn't connect to database")
    c.execute("USE sneakers;")
    return conn, c


conn, c = connect_to_db()


application = Flask(__name__)
api = Api(application)

parser = reqparse.RequestParser()
parser.add_argument('source')
parser.add_argument('size', type=int)

class Search(Resource):
    
    def get(self):
        args = parser.parse_args()
        source = args['source']
        size = args['size']

        query = "SELECT * FROM {}_sneakers WHERE size={}".format(source, size)
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
    #application.run(host='0.0.0.0')   # For production
