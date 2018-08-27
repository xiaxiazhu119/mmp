# -*- coding=utf-8 -*-

from handlers.handlers import FileUploadHandler, ServerDateTimeHandler

common_routes = [{
    'path': r"common/file/upload",
    'handler': FileUploadHandler
}, {
    'path': r"common/datetime",
    'handler': ServerDateTimeHandler
}]
