# -*- coding=utf-8 -*-


import psycopg2
from psycopg2.extras import DictCursor

from conf.db_conf import DBConf

class DBHelper(object):
    
    def connect(self):
        # try:
        conf = DBConf()
        connect_str = conf.get_connect_string()
        # print(connect_str)
        conn = psycopg2.connect(connect_str, cursor_factory=DictCursor)
        conn.set_client_encoding('UTF8')
        # print(conn)
        return conn
        # except psycopg2.OperationalError:
        #     print('psycopg2 error')
