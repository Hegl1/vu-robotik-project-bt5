import sys
import signal
import paramiko
import socket

from flask import jsonify
from flask import Flask
from flask_cors import CORS

from configuration import data_objects, config
from ros_services.node_service import Node_Service
from ros_services.topic_service import Topic_service

def exit_handler(sig, frame):
    sys.exit(0)

def get_command_line():
    if len(sys.argv) < 2:
        print("usage: python3 main.py <config_name.json>")
        sys.exit()
    else:
        return sys.argv[1]

app = Flask(__name__)
CORS(app)
config = config.Configuration(get_command_line())
node_service = Node_Service(config)
topic_service = Topic_service(config)
signal.signal(signal.SIGINT, exit_handler)


@app.route("/nodes/toggle/<package>/<name>", methods=['PATCH', 'GET'])
def start_node(package, name):
    try:
        if node_service.get_node_status(package, name):
            node_service.stop_node(package, name)
            return jsonify(False), 200
        else:
            node_service.start_node(package, name)
            return jsonify(True), 200
    except (paramiko.BadHostKeyException, 
        paramiko.AuthenticationException, 
        paramiko.SSHException,
        socket.gaierror) as e:
        return jsonify(str(e)), 500
    except Exception as e:
        return jsonify(str(e)), 404

@app.route("/update", methods=['GET'])
def construct_update():
    nodes = []
    for node in node_service.get_nodes_with_statuses(config.nodes.values()):
        nodes.append({"package":node[0].package, "name":node[0].name, "running":node[1]})
    return jsonify({"nodes": nodes}), 200

@app.route("/test")
def stop_node():
    result = topic_service.reveice_topic_contents()
    return jsonify(result)

if __name__ == '__main__': 
    app.run(port=5000)