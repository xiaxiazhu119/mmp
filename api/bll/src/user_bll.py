# -*- coding=utf-8 -*-

from dal.dal import UserDAL
from models.src.user_model import User


class UserBLL(object):
    __dal = UserDAL()

    def get_info(self, id):
        return self.__dal.get_info(id)

    def sign_in(self, user_name, pwd):
        return self.__dal.sign_in(user_name, pwd)

    def sign_up(self, user, user_profile):
        return self.__dal.sign_up(user, user_profile)

    def update_pwd(self, id, ori_pwd, new_pwd):
        return self.__dal.update_pwd(id, ori_pwd, new_pwd)

    def update_profile(self, profile):
        return self.__dal.update_profile(profile)
