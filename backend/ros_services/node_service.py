#this file contains a service class that handles 
#interaction with rosnodes, including starting and stopping them.

import subprocess
import paramiko

from configuration import data_objects
from configuration.config import Configuration


class Node_Service:

    def __init__(self, config):
        self.config = config

    def start_node(self, package, name):

        '''
        Method that starts a node selected by the package and the
        name of the node.
        '''

        node = self.config.nodes[f'{package}/{name}']

        if node.ssh is None:
            subprocess.Popen(["rosrun", node.package, node.name, f"__name:={node.package}_{node.name}"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        else:
            self._run_ssh_command(node, f"rosrun {node.package} {node.name} __name:={node.package}_{node.name}")

    def stop_node(self, package, name):

        '''
        Method that stops a node selected by the package and the
        name of the node.
        '''

        node = self.config.nodes[f'{package}/{name}']
        if node.ssh is None:
            subprocess.Popen(["rosnode", "kill", f"{node.package}_{node.name}"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        else:
            self._run_ssh_command(node, f"rosnode kill {node.package}_{node.name}")

    def get_running_node_names(self):

        '''
        Method that gets the names of all currently running nodes
        '''

        actives = subprocess.check_output(["rosnode", "list"])
        return actives.decode("utf-8")

    def get_node_status(self, package, name):

        '''
        Method that gets the status (running or not)
        of a given node determined by package and name.
        '''

        node = self.config.nodes[f'{package}/{name}']
        actives = self.get_running_node_names()
        return f'{node.package}_{node.name}' in actives

    def get_nodes_with_statuses(self, nodes):

        '''
        Method that lists all configured nodes and the running status.
        '''

        actives = self.get_running_node_names()
        response = []
        for node in nodes: 
            running = True if f'{node.package}_{node.name}' in actives else False
            response.append((node, running))
        return response

    def _run_ssh_command(self, node, command):

        '''
        Private method that runs an SSH command. Used for starting nodes via ssh. 
        '''

        ssh = paramiko.SSHClient()
        ssh.connect(node.ssh.ip, username=node.ssh.username, password=node.ssh.password)
        _, stdout, _ = ssh.exec_command(command)
        stdout.channel.recv_exit_status()
        ssh.close()