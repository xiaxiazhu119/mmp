# -*- coding=utf-8 -*-

from dal.dal import AreaDAL


class AreaBLL(object):
    __dal = AreaDAL()

    def get_list(self, pid=None):
        return self.__dal.get_list(pid)
        
