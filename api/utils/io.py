# -*- coding=utf-8 -*-

import os
import time
import random
import math
from werkzeug.utils import secure_filename


class IO(object):
    def __init__(self):
        pass

    @staticmethod
    def save_file(file, path, use_ts=True):
        dir = 'upload'
        p = os.path.join(dir, path)
        if not os.path.exists(p):
            os.makedirs(p)

        file_name = secure_filename(file.filename)

        if use_ts:
            file_name, file_extension = os.path.splitext(file_name)
            file_name += '_' + time.strftime('%Y%m%d%H%M%S') + str(random.randrange(1000, 9999))
            file_name = file_name + file_extension

        file_path = os.path.join(p, file_name)
        file.save(file_path)
        return file_path.replace('\\', '/')

    @staticmethod
    def save_to_file(file_path, text, use_ts=True, encoding='utf-8'):

        # file_name = file_path if file_path != None else 'data_'
        if use_ts:
            file_name, file_extension = os.path.splitext(file_path)
            file_name += '_' + time.strftime('%Y%m%d%H%M%S') + str(random.randrange(1000, 9999))
            file_path = file_name + file_extension

        mode = 'a' if os.path.exists(file_path) else 'w'

        with open(file_path, mode, encoding=encoding) as f:
            f.write(text)

        return file_path

    @staticmethod
    def load_file(file_path, encoding='utf-8'):
        if not os.path.isfile(file_path):
            return None

        with open(file_path, 'r', encoding=encoding) as f:
            a = f.read()
            # print(a)
            # return AuthModel(a)
            return a
