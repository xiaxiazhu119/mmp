# -*- coding=utf-8 -*-

from handlers.handlers import AreaListHandler


area_routes = [{
    'path': r"area/list/<int:pid>",
    'handler': AreaListHandler
}]
