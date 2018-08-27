# -*- coding=utf-8 -*-

import os
import time
import random
import math
from werkzeug.utils import secure_filename
from utils.utils import Utils


class IO(object):

    ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'doc', 'docx', 'xls', 'xlsx'])

    def __init__(self):
        pass

    @staticmethod
    def allowed_file(filename):
        return '.' in filename and \
            filename.rsplit('.', 1)[1] in IO.ALLOWED_EXTENSIONS

    @staticmethod
    def save_file(file, path, use_ts=True):
        root_path = Utils.get_proj_root_path()
        dir = 'upload'
        p = os.path.join(root_path, dir, path)
        if not os.path.exists(p):
            os.makedirs(p)

        file_name = file.filename
        # file_name = secure_filename(file.filename)

        if use_ts:
            file_name = IO.rename(file_name)
            # file_name, file_extension = os.path.splitext(file_name)
            # file_name += '_' + Utils.get_timestamp() + str(random.randrange(100, 999))
            # file_name = file_name + file_extension

        file_path = os.path.join(p, file_name)
        file.save(file_path)
        # return file_path.replace('\\', '/')
        return '/upload/' + path + '/' + file_name

    @staticmethod
    def save_to_file(file_path, text, use_ts=True, encoding='utf-8'):

        # file_name = file_path if file_path != None else 'data_'
        if use_ts:
            file_path = IO.rename(file_path)
            # file_name, file_extension = os.path.splitext(file_path)
            # file_name += '_' + Utils.get_timestamp() + str(random.randrange(1000, 9999))
            # file_name = file_name + file_extension

        mode = 'a' if os.path.exists(file_path) else 'w'

        with open(file_path, mode, encoding=encoding) as f:
            f.write(text)

        return file_path

    @staticmethod
    def rename(file):
        file_name, file_extension = os.path.splitext(file)
        file_name += '_' + Utils.get_timestamp() + str(random.randrange(100, 999))
        file_name = file_name + file_extension
        return file_name

    @staticmethod
    def load_file(file_path, encoding='utf-8'):
        if not os.path.isfile(file_path):
            return None

        with open(file_path, 'r', encoding=encoding) as f:
            a = f.read()
            # print(a)
            # return AuthModel(a)
            return a
