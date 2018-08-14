# -*- coding=utf-8 -*-

from models.src.base_model import BaseModel


class User(BaseModel):

    def __init__(self, id=None, user_name=None, pwd=None, permission_group=None, token_id=None):
        self.id = id
        self.user_name = user_name
        self.pwd = pwd
        self.permission_group = permission_group
        self.token_id = token_id

    def __init__(self, **kw):
        self.id = kw.get('id')
        self.user_name = kw.get('user_name')
        self.pwd = kw.get('pwd')
        self.permission_group = kw.get('permission_group')
        self.token_id = kw.get('token_id')


class UserProfile(BaseModel):

    def __init__(self, user_id=None, name=None, mobile=None, email=None, province=None, province_name=None, city=None, city_name=None, district=None, district_name=None, company_name=None, company_address=None, company_zip_code=None):
        self.user_id = user_id
        self.name = name
        self.mobile = mobile
        self.email = email
        self.province = province
        self.province_name = province_name
        self.city = city
        self.city_name = city_name
        self.district = district
        self.district_name = district_name
        self.company_name = company_name
        self.company_address = company_address
        self.company_zip_code = company_zip_code

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
