# -*- coding=utf-8 -*-

from dal.src.base_dal import BaseDAL
from models.models import MessageInfo

from utils.utils import Utils


class MessageDAL(object):
    __base = BaseDAL()

    def __init__(self, *args):
        pass

    def get_info(self, id):
        sql = """SELECT id,type,title,content,scope_type,scope_value,user_id,create_time FROM mmp_messages WHERE del_flag = False AND id = %s;"""
        rst = self.__base.fetch_all(sql, (str(id),))
        return None if len(rst) == 0 else rst[0]

    def create(self, info):
        sql = """INSERT INTO mmp_messages(type,title,content,scope_type,scope_value,user_id)VALUES(%s,%s,%s,%s,%s,%s) RETURNING id;"""
        rst = self.__base.fetch_all(sql, (info.type, info.title, info.content, info.scope_type, info.scope_value, info.user_id))
        id = self.__base.get_returning_id(rst)
        return id

    def edit(self, info):
        sql = """UPDATE mmp_messages SET type = %s,title = %s,content = %s,scope_type = %s,scope_value = %s WHERE id = %s;"""
        rst = self.__base.fetch_rowcount(sql, (info.type, info.title, info.content, info.scope_type, info.scope_value, info.id))
        return rst

    def get_list(self, sc):
        params = []
        condition = """ WHERE del_flag = False """

        if sc.get('title') is not None:
            condition += """ AND title LIKE %s """
            params.append("""%""" + sc['title'] + """%""")

        if sc.get('type') is not None and sc['type'] != '0':
            condition += """ AND type = %s """
            params.append(sc['type'])

        if sc.get('scopeType') is not None:
            condition += """ AND scope_type = %s """
            params.append(sc['scopeType'])

        if sc.get('scopeTypes') is not None:
            condition += """ AND scope_type IN (""" + sc['scopeTypes'] + """) """

        if sc.get('scopeValue') is not None:
            condition += """ AND ',' || scope_value || ',' LIKE %s """
            params.append("""%,""" + sc['scopeValue'] + """,%""")

        cnt_sql = """SELECT COUNT(1) AS cnt FROM mmp_messages """ + condition + """;"""
        rst = self.__base.fetch_one(cnt_sql, params)
        cnt = rst['cnt']

        sql = """SELECT id,type,title,content,scope_type,scope_value,user_id,create_time FROM mmp_messages """
        sql += condition
        sql += """ ORDER BY id DESC """
        sql += """ LIMIT %s OFFSET %s ; """

        page_size = int(sc['pageSize'] if sc['pageSize'] is not None else 10)
        page_index = int(sc['pageIndex'] if sc['pageIndex'] is not None else 1)-1

        params.append(page_size)
        params.append(page_size*page_index)

        rst = self.__base.fetch_all(sql, params)

        return rst, cnt

    def delete(self, id):
        sql = """UPDATE mmp_messages SET del_flag = True WHERE id = %s;"""
        rst = self.__base.fetch_rowcount(sql, (str(id),))
        return rst
