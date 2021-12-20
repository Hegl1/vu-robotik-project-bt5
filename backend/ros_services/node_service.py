import subprocess
import paramiko

from configuration import data_objects
from configuration.config import Configuration


class Node_Service:

    def __init__(self, config):
        self.config = config

    def start_node(self, package, name):

        node = self.config.nodes[f'{package}/{name}']

        if node.ssh is None:
            subprocess.Popen(["rosrun", node.package, node.name, f"__name:={node.package}_{node.name}"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        else:
            self._run_ssh_command(node, f"rosrun {node.package} {node.name} __name:={node.package}_{node.name}")

    def stop_node(self, package, name):

        node = self.config.nodes[f'{package}/{name}']
        if node.ssh is None:
            subprocess.Popen(["rosnode", "kill", f"{node.package}_{node.name}"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        else:
            self._run_ssh_command(node, f"rosnode kill {node.package}_{node.name}")

    def get_running_node_names(self):
        actives = subprocess.check_output(["rosnode", "list"])
        return actives.decode("utf-8")

    def get_node_status(self, package, name):
        node = self.config.nodes[f'{package}/{name}']
        actives = self.get_running_node_names()
        return f'{node.package}_{node.name}' in actives

    def get_nodes_with_statuses(self, nodes):
        actives = self.get_running_node_names()
        response = []
        for node in nodes: 
            running = True if f'{node.package}_{node.name}' in actives else False
            response.append((node, running))
        return response

    def _run_ssh_command(self, node, command):
        ssh = paramiko.SSHClient()
        ssh.connect(node.ssh.ip, username=node.ssh.username, password=node.ssh.password)
        _, stdout, _ = ssh.exec_command(command)
        stdout.channel.recv_exit_status()
        ssh.close()