from flask import Flask
from flask import jsonify

from ros_services import node_service
from configuration import data_objects

app = Flask(__name__)

@app.route("/start_turtlesim")
def start_node():
    node_service.start_node(data_objects.Ros_node("turtlesim_node", "turtlesim", None))
    return jsonify({"Meaningful":"Message"})

@app.route("/stop_turtlesim")
def stop_node():
    node_service.stop_node(data_objects.Ros_node("/turtlesim", "garbate", None))
    return jsonify({"Meaningful":"Message"})