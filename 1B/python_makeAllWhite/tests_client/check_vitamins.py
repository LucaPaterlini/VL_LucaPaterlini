from requests import post
from json import dumps
import sys

# Constants declaration
PROTOCOL = "http"
DOMAIN_NAME = "127.0.0.1"
PORT = 5050
PATH = "/vitamin/moves"
URL = PROTOCOL+"://"+DOMAIN_NAME+":"+str(PORT)+PATH
# -------

if len(sys.argv) < 2:
    print "This program needs a string with vitamins positions as input e.g. : \"3B 4B 5G 6W\" "
    exit()

payload = {'vitamins': sys.argv[1]}
headers = {'content-type': 'application/json'}
response = post(URL, data=dumps(payload), headers=headers)
print response.content
