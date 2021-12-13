import sys

from flask import jsonify
from flask import Flask 

from configuration import data_objects, config
from ros_services.node_service import Node_Service

def get_command_line():
    if len(sys.argv) < 2:
        print("usage: python3 main.py <config_name.json>")
        sys.exit()
    else:
        return sys.argv[1]

app = Flask(__name__)
config = config.Configuration(get_command_line())
node_service = Node_Service(config)

@app.route("/nodes/toggle/<package>/<name>")
#TODO catch exception when unknown node is called
def start_node(package, name):
    if node_service.get_node_status(package, name):
        node_service.stop_node(package, name)
        return jsonify({"Status":"Stopped"})
    else:
        node_service.start_node(package, name)
        return jsonify({"Status":"Started"})

@app.route("/test")
def stop_node():
    node_service.get_node_status("turtlesim", "turtlesim_node")
    return jsonify({"Meaningful":"Message"})

if __name__ == '__main__': 
    app.run(port=5000)