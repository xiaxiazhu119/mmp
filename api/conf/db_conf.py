# -*- coding=utf-8 -*-

db_conf = {
    'conn': {
        'dev': {
            'host': 'localhost',
            'port': '5432',
            'db': 'mmp',
            'user': 'postgres',
            'password': 'sa'
            # 'password': 'C12E01F2A13FF5587E1E9E4AEDB8242D'
        },
        'prod': {
            'host': 'localhost',
            'port': '5432',
            'db': 'mmp',
            'user': 'postgres',
            'password': 'sa'
        },
    },
    'tmpl': 'host=\'{host}\' port=\'{port}\' dbname=\'{db}\' user=\'{user}\' password=\'{password}\'',
}


class DBConf(object):
    __db_conf = db_conf

    def get_connect_conf(self, is_prod=False):
        k = 'prod' if is_prod else 'dev'
        return self.__db_conf['conn'][k]

    def get_connect_string(self, is_prod=False):
        return self.__get_connect_string_base(is_prod=is_prod)

    def __get_connect_string_base(self, is_prod=False):
        conn = self.get_connect_conf(is_prod=is_prod)
        tmpl = self.__db_conf['tmpl']
        # print(conn,type(conn))
        connect_str = tmpl.format(**conn)
        # print('connect_str: ', connect_str)
        return connect_str

# dbc = __db_conf()
# c = dbc.get_connect_string_pg()
# c2 = dbc.get_connect_string_mssql()
# print(c)
# print(c2)
