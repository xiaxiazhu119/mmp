# -*- coding=utf-8 -*-

import psycopg2
from psycopg2.extras import DictCursor
from helper.db_helper import DBHelper

from bll.bll import UserBLL
from models.models import User, UserProfile, Area

from utils.utils import Utils
from utils.crypto import Crypto
from utils.io import IO

from helper.model_transfer_helper import UserProfileModelTransferHelper


class Test(object):
    def __init__(self):
        pass

    def test_data_to_obj(self):
        user = User()
        print('user:', user.id)
        property_names = Utils.get_obj_property_names(User)
        # print(property_names)
        for prop in property_names:
            user.__dict__[prop] = 1
            print('prop:', user.__dict__[prop])

    def test_encrypt(self):
        conf = {
            'host': 'localhost',
            'port': '5432',
            'db': 'mmp',
            'user': 'postgres',
            'password': 'sa'
        }
        crypto = Crypto()
        print(crypto.get_md5('sa'))
        # conf = Utils.json_dumps(conf)
        # print(conf)
        t = crypto.encrypt_by_aes(conf)
        print(t, type(t))

    def test_dump_cls(self):
        user = User()
        user.id = 1
        d = Utils.json_dumps_dict(user)
        print(d)

    def decrypt_data(self):
        v = "582E68D280CF8E3106E180F8409777128D7D81F87D40EE01C8DE95B747BEA8D439685D920A5EA821CB1821E9823E9693AA2F73AC1AD241FF644163DDA1ECB117AE85325C7200B021614119373357FC0D"
        crypto = Crypto()
        d = crypto.decrypt_by_aes(v)
        print(d)

    def transfer(self):
        v = "1584AF28BDB2F6B3D596B144FE62D8FA583783DAD08A072AFFD464589AB8E0CC051242509B4C8375AB16F9084A3974782AC8DF4E32E99A03928010D951DB95386ACF09F209DD7FD1FDD5A8AF9417708D3ACCD010F1B286B53F0D3C7124966DA2C8452B3B401F293AED61958D7FC8593D692EB7DC6BC0026A20D264FA4471BCD692B938803DA30397100C9FCAD914DC8FB4466A4DA412DB68ED45FF5A0E02BF57149545817B8D8AB66A39BF4BD52FE5418AF489099CC063366043C6F821F7EA4A89B83A1DF9A695EE19DAAD1BBBBB2C8784CA370FE1ED110B7F691E12ECAFC8E7AC19EA758B282407EA7814614BDED55B"
        crypto = Crypto()
        d = crypto.decrypt_by_aes(v)

        d1 = Utils.json_2_obj(d)
        d2 = Utils.json_2_cls(d)

        user = d1['user']

        profile = d1['profile']

        up = UserProfile()

        th = UserProfileModelTransferHelper()
        model = th.transfer_to_py(profile)

        print(model, type(model), model.__dict__)


        # for a in up.__dict__:
        #     print(a)
        # print(user, '\r', profile)
        # print(up.__dict__)

    def get_area(self):
        path = './api/test/src/area.json'
        area_text = IO.load_file(path)
        area_obj = Utils.json_2_obj(area_text)
        # print(area_obj)
        data_list = []

        i = 0;
        for k in area_obj:
            # print(k)
            for k2 in area_obj[k]:
                data_list.append((k2, k, area_obj[k][k2]))
                
            # i += 1

            # if i > 2:
            #     break;

        print(len(data_list))

        sql = """INSERT INTO mmp_areas (id,pid,name) VALUES %s;"""   

        
        db_helper = DBHelper()
        conn = db_helper.connect()

        if conn == None:
            return None

        

        cur = conn.cursor()
        rst = None

        # print('sql:', cur.mogrify(sql, *data_list))

        # psycopg2.extras.execute_values(cur, sql, data_list, page_size=9999)
        # print('rowcount:', cur.rowcount)

        conn.commit()
        conn.close()
    

    def keys(self):
        area = Area()
        print(area.__dict__, Area.__dict__)