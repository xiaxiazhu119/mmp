# -*- coding: utf-8 -*-

import json
import time
import re
import datetime
import os

from utils.typed import JSONObject


class Utils(object):
    def __init__(self):
        pass

    @staticmethod
    def json_dumps(data):
        return json.dumps(data)

    @staticmethod
    def json_dumps_dict(data):
        return json.dumps(data, default=lambda obj: Utils.json_default(obj))

    @staticmethod
    def json_default(value):
        if isinstance(value, datetime.datetime):
            return value.isoformat()
        else:
            return value.__dict__

    @staticmethod
    def json_2_cls(data):
        return json.loads(data, object_hook=JSONObject)

    @staticmethod
    def json_2_obj(data):
        return json.loads(data)

    @staticmethod
    def decode_unicode(data):
        return data.replace('\n', '\\n').encode('utf-8').decode('unicode-escape')
        # return data.replace('\\"', '\\\\"').encode('utf-8').decode('unicode-escape').replace('\n', '\\n')
        # return data

    @staticmethod
    def tuple_to_dict(data, key_list):
        return dict(map(lambda x, y: (x, y), key_list, data))

    @staticmethod
    def now_date():
        return Utils.now(f='%Y%m%d')

    @staticmethod
    def now_time():
        return Utils.now(f='%Y-%m-%d %H:%M:%S')

    @staticmethod
    def get_timestamp():
        return Utils.now('%Y%m%d%H%M%S')

    @staticmethod
    def now(f=None):
        if f is None:
            return time
        return time.strftime(f)

    @staticmethod
    def get_obj_property_names(obj):
        property_names = [p for p in dir(obj) if isinstance(getattr(obj, p), property)]
        return property_names

    @staticmethod
    def get_cls_fields_values(cls):
        fields = []
        values = []
        for prop in cls.__dict__:
            fields.append(prop)
            values.append(getattr(cls, prop))

        return fields, values

    @staticmethod
    def get_proj_root_path():
        cwd = os.getcwd()
        server_file = 'server.py'
        dirs = ['', 'api']
        root_path = cwd
        for d in dirs:
            root_path = os.path.join(root_path, d)
            p = os.path.join(root_path, server_file)
            if os.path.exists(p):
                break

        print(root_path)
        return root_path
