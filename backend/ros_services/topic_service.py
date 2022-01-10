#file contains a service class that handles interaction with topics.

import rospy
import copy

from importlib import import_module
from configuration import config, data_objects
from threading import Lock, Thread

#constant that determins how many messages of a topic get buffered.
MAX_BUF_SIZE = 20

class Topic_service:

    def __init__(self, config):
        self.topics = dict()
        self.locks = dict()
        self.config = config
        for topic in config.topic_dict:
            self.locks[topic] = Lock()
            self.topics[topic] = list()
        self._sub_to_topics()

    def _generic_callback(self, data, topic_name):

        '''
        Private method that handles what happens if a topic posts an update.
        '''

        connection_header =  data._connection_header['type'].split('/')
        ros_pkg = connection_header[0] + '.msg'
        msg_type = connection_header[1]
        msg_class = getattr(import_module(ros_pkg), msg_type)
        self.locks[topic_name].acquire()
        self.topics[topic_name].append(str(msg_class().deserialize(data._buff)))
        if len(self.topics[topic_name]) > MAX_BUF_SIZE:
            self.topics[topic_name].pop(1)
        self.locks[topic_name].release()
    
    def _callback_wrapper(self, topic_name):

        '''
        Private method that returns a callback function for a topic.
        '''

        return lambda data: self._generic_callback(data, topic_name)

    def _sub_to_topics(self):

        '''
        Private method that subscribes to the configured topics.
        '''

        rospy.init_node('topic_service_topic_reader', anonymous=True)
        for topic_name in self.topics:
            rospy.Subscriber(topic_name, rospy.AnyMsg, self._callback_wrapper(topic_name))
        
    def receive_topic_contents(self):

        '''
        Method that returns the currently buffered contetns
        of all configured topics.s
        '''

        result = list()
        for topic in self.topics:
            self.locks[topic].acquire()
            tmp = copy.deepcopy(self.topics[topic])
            self.locks[topic].release()
            result.append({"name" : topic, "type": self.config.topic_dict[topic].type, "content":tmp})
        return result

