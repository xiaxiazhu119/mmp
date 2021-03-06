# -*- coding=utf-8 -*-
from flask import request

from handlers.src.base_handler import BaseHandler
from utils.io import IO
from utils.utils import Utils


class FileUploadHandler(BaseHandler):

    def __init__(self):
        self.need_auth = True
        super().__init__()

    def post(self):
        file = self.base_request.files['file']

        if file and IO.allowed_file(file.filename):
            file_path = IO.save_file(file, str(self.user_id))
            return self.build_response(['common', 'file-upload-success'], file_path)

        return self.build_response(['common', 'file-upload-failed'])


class ServerDateTimeHandler(BaseHandler):

    def __init__(self):
        self.need_auth = False
        super().__init__()

    def post(self):
        now = Utils.now()

        return self.build_response(['common', 'server-date-time-success'], now)
