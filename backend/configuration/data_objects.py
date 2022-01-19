#this file contains dataclasses that are used to represent the config.

from dataclasses import dataclass
from enum import Enum

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

@dataclass
class Ros_topic:
    name: str
    type: str