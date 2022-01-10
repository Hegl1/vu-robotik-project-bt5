import rospy

from importlib import import_module
from configuration import config, data_objects
from threading import Lock, Thread


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
        connection_header =  data._connection_header['type'].split('/')
        ros_pkg = connection_header[0] + '.msg'
        msg_type = connection_header[1]
        msg_class = getattr(import_module(ros_pkg), msg_type)
        self.locks[topic_name].acquire()
        self.topics[topic_name].append(str(msg_class().deserialize(data._buff)))
        self.locks[topic_name].release()
    
    def _callback_wrapper(self, topic_name):
        return lambda data: self._generic_callback(data, topic_name)

    def _sub_to_topics(self):
        rospy.init_node('topic_service_topic_reader', anonymous=True)
        for topic_name in self.topics:
            rospy.Subscriber(topic_name, rospy.AnyMsg, self._callback_wrapper(topic_name))
        
    def receive_topic_contents(self):
        result = list()
        for topic in self.topics:
            self.locks[topic].acquire()
            tmp = self.topics[topic]
            self.topics[topic] = []
            self.locks[topic].release()
            result.append({"name" : topic, "type": self.config.topic_dict[topic].type, "content":tmp})
        return result

