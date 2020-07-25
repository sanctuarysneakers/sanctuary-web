from flask import Flask, render_template, request
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)


class Search(Resource):

    @staticmethod
    def get(user_input):
        return {'Sneaker': user_input}


api.add_resource(Search, '/search<string:input>')
  
if __name__ == '__main__':
    app.run(debug=True)