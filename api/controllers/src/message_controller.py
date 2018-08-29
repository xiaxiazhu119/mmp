# -*- coding=utf-8 -*-

from bll.bll import MessageBLL
from controllers.src.base_controller import BaseController
from models.models import MessageInfo


class MessageController(BaseController):
    __bll = MessageBLL()


    def get_info(self, id):
        return self.__bll.get_info(id)
        
    def create(self, info):
        return self.__bll.create(info)

    def edit(self, info):
        return self.__bll.edit(info)

    def get_list(self, sc):
        return self.__bll.get_list(sc)

    def delete(self, id):
        return self.__bll.delete(id)

