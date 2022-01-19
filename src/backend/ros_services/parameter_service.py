#this file contains a service 
#class that handles interaction with parameters from the parameterservice.

import rospy

from configuration import config

class Parameter_service:

    def __init__(self, config):
        self.config = config

    def get_parameters(self):

        '''
        Method that receives all configured parameters from parameterserver.
        '''

        result = dict()
        for parameter in self.config.parameters:
            try:
                result[parameter] = rospy.get_param(parameter)
            except KeyError:
                result[parameter] = None
        return result
