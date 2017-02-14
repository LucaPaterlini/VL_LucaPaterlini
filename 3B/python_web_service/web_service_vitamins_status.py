#!/usr/bin/python
from flask import Flask, request
from ast import literal_eval
from json import dumps
from flask_cors import CORS
from lib import makeAllWhite, makeAllWhiteStatus
from sys import argv

def getVitamins(request):
    if request.data:
        return literal_eval(request.data)["vitamins"]
    else:
        return request.values.get("vitamins")

app = Flask(__name__)
CORS(app)

# default: return a standard message to show that the service is active


@app.route('/', methods=['POST', 'GET'])
def default():
    return "Hi to everyone. I' am alive!! :)"


# response_moves: create a web service on  "EXECUTION_DOMAIN:PORT/vitamin/moves"
# getting as input the configuration of the vitamins eg: "3B 4B 5G 6W"
# and returning the list of moves to make the colors of the shapes white


@app.route('/vitamin/moves', methods=['POST', 'GET'])
def response_moves():
    s_vitamins = getVitamins(request)
    return dumps(makeAllWhite(s_vitamins), indent=4)

# response_status: create a web service on  "EXECUTION_DOMAIN:PORT/vitamin/status"
# getting as input the configuration of the vitamins eg: "3B 4B 5G 6W" and a list
# and returning the list of status changed during the transition
# to make the colors of the shapes white


@app.route('/vitamin/statuses', methods=['POST', 'GET'])
def response_status():
    s_vitamins = getVitamins(request)
    return dumps(makeAllWhiteStatus(s_vitamins, makeAllWhite(s_vitamins)), indent=4)

if __name__ == '__main__':
    input_port = None
    if len(argv) > 1:
        input_port = argv[1]

    app.run(port=input_port, debug=False, threaded=True)
