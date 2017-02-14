#!/usr/bin/python
from flask import Flask, request
from ast import literal_eval
from json import dumps
from lib import makeAllWhite
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# response: create a web service on  "EXECUTION_DOMAIN:5050/vitamin/moves"
# getting as input the configuration of the vitamins eg: "3B 4B 5G 6W"
# and returning the list of moves to make the colors of the shapes white


@app.route('/vitamin/moves', methods=['POST', 'GET'])
def response():
    if request.data:
        s_vitamins = literal_eval(request.data)["vitamins"]
    else:
        s_vitamins = request.values.get("vitamins")
    return dumps(makeAllWhite(s_vitamins), indent=4)

if __name__ == '__main__':
    app.run(debug=False, threaded=True)
