# -*- coding=utf-8 -*-

from dal.src.base_dal import BaseDAL
from models.models import Area

from utils.utils import Utils


class AreaDAL(object):
    __base = BaseDAL()

    def __init__(self, *args):
        pass

    def get_list(self, pid=None):
        sql = """SELECT id,pid,name FROM mmp_areas """
        if pid is not None:
            sql += """ WHERE pid = """ + str(pid)
        sql += """ ORDER BY id;"""
        data_list = self.__base.fetch_all(sql)

        # data_list = []
        # if len(r) > 0:
        #     keys = Area().__dict__
        #     data_list = list(map(lambda x: (
        #         dict(map(lambda k, v: (k, v), keys, x))
        #     ), r))

        return data_list
