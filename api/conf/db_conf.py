# -*- coding=utf-8 -*-

from utils.utils import Utils
from utils.crypto import Crypto

db_conf = {
    'env': 'dev',
    'conn': {
        'dev': '10E4B64CE09A5AACBAE26673527B1D9A0E2FF8DFACF8EF820270E8C3F6E492CEC6310D24601D6C158CC51B911590186F21BE927035B3A1AF0F5558EDD3DE618A2E5CB7F162CE54D72F04D8B7495239879640157FACDA088086156BE7CA88BA33',
        'remote': '50E5D6E9FADE88FDF0E5F5103E18540EB071A58619388D2C0653FC35A85E84F9A895D8D364F25C1D77755CAC0A9F238EBD0B6F7943DBC3D9D242D50962E1AB09CBA3BD48ACCDD301E69846AE15CC0BEDD40411796BCE5B29A874FAF72DAA6179F9AB22401CF6D1D6F7461EACDD5FAC4F',
        'prod': '10E4B64CE09A5AACBAE26673527B1D9A0E2FF8DFACF8EF820270E8C3F6E492CEC6310D24601D6C158CC51B911590186F21BE927035B3A1AF0F5558EDD3DE618A2E5CB7F162CE54D72F04D8B749523987C6B0B2F324F69AE0576E4215095261C17EB950FACBECA34A4F131016507490F6'
    },
    'tmpl': 'host=\'{host}\' port=\'{port}\' dbname=\'{db}\' user=\'{user}\' password=\'{password}\'',
}


# db_conf = {
#     'conn': {
#         'dev': {
#             'host': 'localhost',
#             'port': '5432',
#             'db': 'mmp',
#             'user': 'postgres',
#             'password': 'sa'
#             # 'password': 'C12E01F2A13FF5587E1E9E4AEDB8242D'
#         },
#         'prod': {
#             'host': 'localhost',
#             'port': '5432',
#             'db': 'mmp',
#             'user': 'postgres',
#             'password': 'sa'
#         },
#     },
#     'tmpl': 'host=\'{host}\' port=\'{port}\' dbname=\'{db}\' user=\'{user}\' password=\'{password}\'',
# }


class DBConf(object):
    __db_conf = db_conf

    def get_connect_conf(self):
        env = self.__db_conf['env']
        conf = self.__db_conf['conn'][env]
        crypto = Crypto()
        conf = Utils.json_2_obj(crypto.decrypt_by_aes(conf))
        # print(conf)
        return conf

    def get_connect_string(self):
        return self.__get_connect_string_base()

    def __get_connect_string_base(self):
        conn = self.get_connect_conf()
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
