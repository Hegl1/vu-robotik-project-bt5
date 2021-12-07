import subprocess

from configuration import data_objects

def start_node(node):
    if node.ssh is None:
        #start node on local machine
        subprocess.Popen(["rosrun", node.package, node.name], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    else:
        #start node on remote machine
        pass

def stop_node(node):
    if node.ssh is None:
        subprocess.Popen(["rosnode", "kill", node.name], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        pass
    else:
        #stop node on remote machine
        pass

def get_node_status(node):
    pass
