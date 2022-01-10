import rospy

from configuration import config

class Parameter_service:

    def __init__(self, config):
        self.config = config

    def get_parameters(self):
        result = dict()
        for parameter in self.config.parameters:
            result[parameter] = rospy.get_param(parameter)
        return result
