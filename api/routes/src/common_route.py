# -*- coding=utf-8 -*-

from handlers.handlers import FileUploadHandler

common_routes = [{
    'path': r"common/file/upload",
    'handler': FileUploadHandler
}]
