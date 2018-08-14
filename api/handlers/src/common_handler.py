# -*- coding=utf-8 -*-
from flask import request

from handlers.src.base_handler import BaseHandler
from utils.io import IO


class FileUploadHandler(BaseHandler):
    def __init__(self):
        self.need_auth = True
        super().__init__()

    def post(self):
        file = self.base_request.files['file']
        file_path = IO.save_file(file, str(self.user_id))
        # print('file_path:', file_path)
        return self.build_response(['common', 'file-upload-success'], file_path)
