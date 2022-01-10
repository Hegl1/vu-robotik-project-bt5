import json

from configuration.data_objects import *

class Configuration:

    def __init__(self, json):
        self.nodes = dict()
        self.topic_dict = dict()
        self.parameters = list()
        self.read_from_JSON(json)
        print(self.parameters)

    def read_from_JSON(self, json_path):
        with open(json_path) as json_file:
            raw_json_dict = json.load(json_file)
        for node in raw_json_dict["nodes"]:
            self._parse_node(node)
        for topic in raw_json_dict["topics"]:
            self._parse_topic(topic)
        for parameter in raw_json_dict["parameters"]:
            self.parameters.append(parameter)
    
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

    def _parse_topic(self, topic_dict):
        topic = Ros_topic(topic_dict['name'], topic_dict['type'])
        self.topic_dict[topic.name] = topic

class ConfigDuplicateException(Exception):
    pass