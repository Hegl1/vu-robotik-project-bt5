from flask import Flask
from flask import jsonify

app = Flask(__name__)

@app.route("/")
def testEndpoint():
    return jsonify({"Hello":"World"})

if __name__ == '__main__':
    app.run(port=5001)