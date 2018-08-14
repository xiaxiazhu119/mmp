# -*- coding=utf-8 -*-

from itsdangerous import TimedJSONWebSignatureSerializer as Serializer

from conf.api_conf import ApiConf


class ApiHelper(object):

    @staticmethod
    def generate_auth_token():
        auth_conf = ApiConf.get_auth_conf()
        s = Serializer(auth_conf['secret_key'], expires_in=auth_conf['token_expire'])
        print('generate_auth_token:', s)
        return s

    @staticmethod
    def verify_auth_token_id(token_id):
        auth_conf = ApiConf.get_auth_conf()
        s = Serializer(auth_conf['secret_key'])
        try:
            data = s.loads(token_id)
        except Exception:
            return None  # valid token, but expired

        return data
