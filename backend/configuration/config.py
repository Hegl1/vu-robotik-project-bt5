import json

from configuration.data_objects import *

class config:

    def __init__(self):
        self.nodes = dict()

    def read_from_JSON(self, json_path):
        with open(json_path) as json_file:
            raw_json_dict = json.load(json_file)
        for node in raw_json_dict["nodes"]:
            self._parse_node(node)
    
    def _parse_node(self, node_dict):
        node = Ros_node(node_dict['name'], 
        node_dict['package'], 
        self._parse_ssh_credentials(node_dict['ssh']))
        node_id = node.package + '/' + node.name
        if node_id not in self.nodes:
            self.nodes[node_id] = node
        else:
            raise ConfigDuplicateException

    def _parse_ssh_credentials(self, ssh_dict):
        ssh = None if ssh_dict == None else SSH_credentials(ssh_dict['ip'],
        ssh_dict['username'],
        ssh_dict['password'])
        return ssh

class ConfigDuplicateException(Exception):
    pass