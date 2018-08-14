# -*- coding=utf-8 -*-

from dal.src.base_dal import BaseDAL
from models.models import User, UserProfile

from utils.utils import Utils


class UserDAL(object):
    __base = BaseDAL()

    def __init__(self, *args):
        pass

    def sign_in(self, user_name, pwd):
        sql = """SELECT id, user_name,permission_group FROM mmp_users WHERE user_name = %s AND pwd = %s AND del_flag = False;"""
        r = self.__base.fetch_all(sql, (user_name, pwd))
        if len(r) == 0:
            return None

        r = r[0]
        user = User(**r)
        # user.id = r['id']
        # user.user_name = r['']
        # user.permission_group = r[2]

        return user

    def sign_up(self, user, user_profile):
        sql = """SELECT id FROM mmp_users WHERE user_name = %s;"""
        rst = self.__base.fetch_all(sql, (user.user_name,));
        if len(rst) > 0:
            return None

        sql = """INSERT INTO mmp_users (user_name,pwd) VALUES (%s,%s) RETURNING id,permission_group;"""
        # id = 20
        rst = self.__base.fetch_all(sql, (user.user_name, user.pwd))[0];

        nu = User(**rst)
        nu.user_name = user.user_name

        user_profile.user_id = user.id
        fields, values = Utils.get_cls_fields_values(user_profile)
        fields = ','.join(fields)
        sql = """INSERT INTO mmp_user_profiles ("""+fields+""") VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"""
        r = self.__base.fetch_rowcount(sql, tuple(values))
        return nu

    def update_pwd(self, id, ori_pwd, new_pwd):
        sql = """UPDATE mmp_users SET pwd = %s WHERE id = %s AND pwd = %s;"""
        r = self.__base.fetch_rowcount(sql, (new_pwd, id, ori_pwd))
        return r
