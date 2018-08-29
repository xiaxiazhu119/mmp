# -*- coding=utf-8 -*-

from dal.dal import MessageDAL


class MessageBLL(object):
    __dal = MessageDAL()

    def __init__(self, *args):
        pass

    def get_info(self, id):
        return self.__dal.get_info(id)

    def create(self, info):
        return self.__dal.create(info)

    def edit(self, info):
        return self.__dal.edit(info)

    def get_list(self, sc):
        return self.__dal.get_list(sc)

    def delete(self, id):
        return self.__dal.delete(id)

