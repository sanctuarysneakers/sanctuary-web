from flask import Flask, render_template, request,jsonify
from flask_restful import Resource, Api
import mysql.connector
from mysql.connector import ProgrammingError

host = "test-database-1.cmamugrum56i.us-west-2.rds.amazonaws.com"
user = "admin"
passwd = "password"
db_name = "sneakers"
try:
    conn = mysql.connector.connect(host=host, user=user, passwd=passwd, database=db_name)
    c = conn.cursor()
except ProgrammingError:
    print("couldn't connect to database")
c.execute("USE sneakers;")

app = Flask(__name__)
api = Api(app)


class Search(Resource):

    @staticmethod
    def get(user_input):
        query = "SELECT * FROM sneakers WHERE url == %s"
        c.execute(query, user_input)
        return jsonify(c)


api.add_resource(Search, '/search<string:input>')
  
if __name__ == '__main__':
    app.run(debug=True)