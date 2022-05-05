from flask import Flask, Response
import socket
import time

app = Flask(__name__)

# Enable debugging if the DEBUG environment variable is set and starts with Y
app.debug = os.environ.get("DEBUG", "").lower().startswith('y')

hostname = socket.gethostname()


@app.route("/")
def index():
    return "hasher running on {}\n".format(hostname)


@app.route("/<string:binary_string>")
def hasher(binary_string):
    # Simulate a little bit of delay
    time.sleep(0.1)


    return Response(
        os.read(urandom, how_many_bytes),
        content_type="application/octet-stream")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80, threaded=False)

