
# -*- coding: utf-8 -*-

import psycopg2
from psycopg2.extras import DictCursor, RealDictCursor

from helper.db_helper import DBHelper


class BaseDAL(object):
    __cur = None

    def __init__(self, *args, **kwargs):
        self.db_helper = DBHelper()
        pass

    def fetch_rowcount(self, sql, *params, **kw):
        def callback(cur):
            # print('cur:',cur)
            return cur.rowcount

        return self.__execute_sql(sql, callback, *params, **kw)

    def fetch_one(self, sql, *params, **kw):
        def callback(cur):
            return cur.fetchone()

        return self.__execute_sql(sql, callback, *params, **kw)

    def fetch_all(self, sql, *params, **kw):
        def callback(cur):
            return cur.fetchall()

        return self.__execute_sql(sql, callback, *params, **kw)

    def __execute_sql(self, sql, callback, *params, **kw):
        conn = self.db_helper.connect()

        if conn == None:
            return None

        # print(sql, *params, type(params), len(params), **kw)
        is_multiple = False if kw.get('is_multiple') == None else kw['is_multiple']
        # print('--kw--:', kw, kw.get('is_multiple'), is_multiple)

        cur = conn.cursor(cursor_factory=RealDictCursor)
        # cur = conn.cursor()
        rst = None

        # sql = """INSERT INTO mmp_users (user_name,pwd) VALUES (%s,%s) RETURNING id;"""
        try:
            print('sql:', cur.mogrify(sql, *params))
        except:  # catch *all* exceptions
            e = sys.exc_info()[0]
            print('errors:', e)
        # cur.execute(sql, *params)
        # rst = cur.fetchone()
        # print(rst)

        if is_multiple:
            psycopg2.extras.execute_values(cur, sql, params, page_size=9999)
        else:
            if params != None:
                # print('sql:', cur.mogrify(sql, *params))
                cur.execute(sql, *params)
            else:
                cur.execute(sql)

        # rst = cur.fetchone()

        rst = callback(cur)
        conn.commit()
        conn.close()
        # print('rst:',rst)
        return rst

    def callproc(self, proc_name, *params):
        conn = self.db_helper.connect()

        if conn == None:
            return None

        cur = conn.cursor()
        cur.callproc(proc_name, *params)
        rst = cur.fetchall()

        conn.commit()
        conn.close()
        return rst


"""
    # def execute_values(self, sql, *params):
    #     conn = db_helper.connect()

    #     if conn == None:
    #         return None

    #     print(params, type(params), list(params))

    #     cur = conn.cursor()
    #     psycopg2.extras.execute_values(cur, sql, params)
    #     rst = cur.rowcount
    #     conn.commit()
    #     conn.close()
    #     return rst
"""
