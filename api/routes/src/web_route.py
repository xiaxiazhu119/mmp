# -*- coding=utf-8 -*-

from handlers.handlers import WebHandler


web_routes = [{
    'path': r"",
    'handler': WebHandler,
    'is_root': True
}]
