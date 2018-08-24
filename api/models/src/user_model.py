# -*- coding=utf-8 -*-

from models.src.base_model import BaseModel


class User(BaseModel):

    def __init__(self, **kw):
        self.id = kw.get('id')
        self.user_name = kw.get('user_name')
        self.pwd = kw.get('pwd')
        self.permission_group = kw.get('permission_group')
        self.token_id = kw.get('token_id')


class UserProfile(BaseModel):

    def __init__(self, **kw):
        self.user_id = kw.get('user_id')
        self.name = kw.get('name')
        self.mobile = kw.get('mobile')
        self.email = kw.get('email')
        self.province = kw.get('province')
        self.province_name = kw.get('province_name')
        self.city = kw.get('city')
        self.city_name = kw.get('city_name')
        self.district = kw.get('district')
        self.district_name = kw.get('district_name')
        self.company_name = kw.get('company_name')
        self.company_address = kw.get('company_address')
        self.company_zip_code = kw.get('company_zip_code')
        self.id_card = kw.get('id_card')


"""
    @property
    def id(self):
        return self._id

    @id.setter
    def id(self, value):
        self._id = value

    @property
    def user_name(self):
        return self._user_name

    @user_name.setter
    def user_name(self, value):
        self._user_name = value

    @property
    def pwd(self):
        return self._pwd

    @pwd.setter
    def pwd(self, value):
        self._pwd = value

    @property
    def token_id(self):
        return self._token_id

    @token_id.setter
    def token_id(self, value):
        self._token_id = value
"""
