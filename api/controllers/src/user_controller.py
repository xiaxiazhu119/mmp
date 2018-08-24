# -*- coding=utf-8 -*-

from bll.bll import UserBLL

from controllers.src.base_controller import BaseController


class UserController(BaseController):
    __bll = UserBLL()

    def get_info(self, id):
        return self.__bll.get_info(id)

    def sign_in(self, user_name, pwd):
        return self.__bll.sign_in(user_name, pwd)

    def sign_up(self, user, user_profile):
        return self.__bll.sign_up(user, user_profile)

    def update_pwd(self, id, ori_pwd, new_pwd):
        return self.__bll.update_pwd(id, ori_pwd, new_pwd)

    def update_profile(self, profile):
        return self.__bll.update_profile(profile)
