# -*- coding=utf-8 -*-
from flask import request

from handlers.src.base_handler import BaseHandler
from controllers.controllers import AreaController


class AreaHandler(BaseHandler):
        pass


class AreaListHandler(BaseHandler):
    def get(self, pid):
        ctrl = AreaController()
        area_list = ctrl.get_list(pid)
        return self.build_response(['common', 'area-list-success'], area_list)
