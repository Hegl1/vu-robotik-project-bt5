from dataclasses import dataclass

@dataclass
class SSH_credentials:
    ip: str
    username: str
    password: str

@dataclass
class Ros_node:
    name: str
    package: str
    ssh: SSH_credentials = None