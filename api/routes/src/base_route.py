# -*- coding=utf-8 -*-

from routes.src.web_route import web_routes
from routes.src.user_route import user_routes
from routes.src.area_route import area_routes
from routes.src.manuscript_route import manuscript_routes
from routes.src.message_route import message_routes

from routes.src.common_route import common_routes

class BaseRoute(object):
    def __init__(self):
        pass

    def get_route_list(self):
        route_list = []
        # route_list.extend(web_routes)
        route_list.extend(user_routes)
        route_list.extend(area_routes)
        route_list.extend(manuscript_routes)
        route_list.extend(message_routes)
        route_list.extend(common_routes)

        return route_list

