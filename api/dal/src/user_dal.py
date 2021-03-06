# -*- coding=utf-8 -*-

from dal.src.base_dal import BaseDAL
from models.models import User, UserProfile

from utils.utils import Utils


class UserDAL(object):
    __base = BaseDAL()

    def __init__(self, *args):
        pass

    def get_info(self, id):
        sql = """SELECT * FROM mmp__v_users WHERE id = %s;"""
        r = self.__base.fetch_all(sql, (str(id),))
        if len(r) == 0:
            return None

        r = r[0]
        user = User(**r)
        user_profile = UserProfile(**r)

        return user, user_profile

    def sign_in(self, user_name, pwd):
        sql = """SELECT * FROM mmp__v_users WHERE user_name = %s AND pwd = %s;"""
        r = self.__base.fetch_all(sql, (user_name, pwd))
        if len(r) == 0:
            return None

        r = r[0]
        user = User(**r)
        user_profile = UserProfile(**r)
        # user.id = r['id']
        # user.user_name = r['']
        # user.permission_group = r[2]

        return user, user_profile

    def sign_up(self, user, user_profile):
        sql = """SELECT id FROM mmp_users WHERE user_name = %s;"""
        rst = self.__base.fetch_all(sql, (user.user_name,))
        if len(rst) > 0:
            return None

        sql = """INSERT INTO mmp_users (user_name,pwd) VALUES (%s,%s) RETURNING id,permission_group;"""
        # id = 20
        rst = self.__base.fetch_all(sql, (user.user_name, user.pwd))[0]
        # print(rst)

        nu = User(**rst)
        nu.user_name = user.user_name

        user_profile.user_id = nu.id
        fields, values = Utils.get_cls_fields_values(user_profile)
        fields = ','.join(fields)
        sql = """INSERT INTO mmp_user_profiles ("""+fields+""") VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);"""
        r = self.__base.fetch_rowcount(sql, tuple(values))
        return nu

    def update_pwd(self, id, ori_pwd, new_pwd):
        sql = """UPDATE mmp_users SET pwd = %s WHERE id = %s AND pwd = %s;"""
        r = self.__base.fetch_rowcount(sql, (new_pwd, id, ori_pwd))
        return r

    def update_profile(self, profile):
        sql = """UPDATE mmp_user_profiles SET """
        params = []
        fields = []
        for d in profile.__dict__:
            if d == 'user_id':
                continue

            v = getattr(profile, d)
            if v is not None:
                fields.append(d + ' = %s')
                params.append(v)
        sql += ', '.join(fields) + """ WHERE user_id = %s;"""
        params.append(getattr(profile, 'user_id'))
        # r = 0
        r = self.__base.fetch_rowcount(sql, tuple(params))
        return r
