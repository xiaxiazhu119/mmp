# -*- coding=utf-8 -*-

from bll.bll import AreaBLL

from controllers.src.base_controller import BaseController


class AreaController(BaseController):
    __bll = AreaBLL()

    def get_list(self, pid=None):
        return self.__bll.get_list(pid)
        