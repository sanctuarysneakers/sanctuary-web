from flask import Flask, jsonify
from flask_restful import Resource, Api
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

class Search(Resource):

    @staticmethod
    def get(user_input):
        query = "SELECT * FROM goat_sneakers WHERE url == %s"
        try:
            c.execute(query, user_input)
        except:
            conn, c = connect_to_db()
            c.execute(query, user_input)
        return c


api.add_resource(Search, '/search<string:input>')
  
if __name__ == '__main__':
    application.run(debug=True)