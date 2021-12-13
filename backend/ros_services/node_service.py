import subprocess

from configuration import data_objects
from configuration.config import Configuration


class Node_Service:

    def __init__(self, config):
        self.config = config

    def start_node(self, package, name):

        node = self.config.nodes[f'{package}/{name}']

        if node.ssh is None:
            #start node on local machine
            subprocess.Popen(["rosrun", node.package, node.name, f"__name:={node.package}_{node.name}"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        else:
            #start node on remote machine
            pass

    def stop_node(self, package, name):

        node = self.config.nodes[f'{package}/{name}']
        if node.ssh is None:
            subprocess.Popen(["rosnode", "kill", f"{node.package}_{node.name}"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        else:
            #stop node on remote machine
            pass


    def get_node_status(self, package, name):
        node = self.config.nodes[f'{package}/{name}']
        actives = subprocess.check_output(["rosnode", "list"])
        return f'{node.package}_{node.name}' in actives.decode("utf-8")
