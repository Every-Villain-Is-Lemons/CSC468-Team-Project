
from flask import Flask, Response
import os
import socket
import time
import hashlib


app = Flask(__name__)

# Enable debugging if the DEBUG environment variable is set and starts with Y
DEBUG = os.environ.get("DEBUG", "").lower().startswith('y')

hostname = socket.gethostname()

ha = sha256()

@app.route("/")
def index():
    return "HASHER running on {} \n".format(hostname)


@app.route("/<String:the_string")
def hasher(the_string):
    # Simulate a little bit of delay
    time.sleep(0.1)
    ha.update(the_string)
#If needed we can make the read function read the hash length and that will be the amount of bits it reads
#Lets see how this works first.
    return Response(
        os.read(ha.hexdigest(), 32),
        content_type="application/octet-stream")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80, threaded=False)




