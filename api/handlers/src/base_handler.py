# -*- coding=utf-8 -*-


from flask import Flask, request
from flask_restful import Resource, Api

from utils.utils import Utils
from utils.crypto import Crypto
from helper.api_helper import ApiHelper
from conf.api_conf import ApiConf


class BaseHandler(Resource):

    __custom_header_auth_key = 'X-Custom-Header-Tokenid'

    user_id = None
    token_id_valid = False
    need_auth = False
    base_request = None

    crypto = Crypto()

    def __init__(self):
        if self.need_auth:
            self.__verify_token()

        self.base_request = request

    def __verify_token(self):
        if request.headers.get(self.__custom_header_auth_key) is not None:
            token_id = request.headers[self.__custom_header_auth_key]
            token_id = self.crypto.decrypt_by_aes(token_id)
            if token_id != '':
                self.token_id_valid = True
                self.user_id = int(token_id.split(',')[0])
            # self.token_id = ApiHelper.verify_auth_token(_token_id)

    def get(self):
        if self.need_auth and self.token_id_valid:
            return self.build_auth_invalid_response()
        return {'method': 'get'}

    def post(self):
        if self.need_auth and self.token_id_valid:
            return self.build_auth_invalid_response()
        print('base post')
        return {'method': 'post'}

    def put(self):
        print('base put')
        return {'method': 'put'}

    def delete(self):
        if self.need_auth and self.token_id_valid:
            return self.build_auth_invalid_response()
        print('base delete')
        return {'method': 'delete'}

    def head(self):
        print('base head')
        return {'method': 'head'}

    def get_common_request_json_data(self):
        return self.get_request_json_data('data')

    def get_request_json_data(self, key):

        request_json_data = None

        if self.base_request is not None and self.base_request.mimetype != 'multipart/form-data':
            request_data = self.base_request.get_data().decode('utf8')
            if request_data != '':
                request_json_data = self.base_request.get_json()
                if request_json_data is not None and request_json_data.get('data') is not None:
                    request_json_data = request_json_data['data']
                    request_json_data = self.crypto.decrypt_by_aes(request_json_data)
                    request_json_data = None if request_json_data == '' else Utils.json_2_obj(request_json_data)

        if request_json_data is None:
            return None

        return request_json_data[key]

    def get_request_args(self, key):
        if self.base_request is not None and len(self.base_request.args) > 0:
            encrypted_arg = self.base_request.args[key]
            arg = self.crypto.decrypt_by_aes(encrypted_arg)
            arg = None if arg == '' else Utils.json_2_obj(arg)
            return arg

        return None

    def build_response(self, keys=[], data=None, use_encrypt=True):
        response = ApiConf.get_response(keys)
        return self.build_response_base(response['code'], response['msg'], data, use_encrypt=use_encrypt)
        # rsp = {
        #     'code': code,
        #     'msg': msg,
        #     'data': '' if data == None else self.crypto.encrypt_by_aes(Utils.json_dumps_dict(data))
        # }
        # # return Utils.json_dumps(rsp)
        # return rsp

    def build_response_base(self, code=1, msg='ok', data=None, use_encrypt=True):
        data = data if type(data) is str else Utils.json_dumps_dict(data)
        rsp = {
            'code': code,
            'msg': msg,
            'data': '' if data is None else (self.crypto.encrypt_by_aes(data) if use_encrypt else data)
        }
        # return Utils.json_dumps(rsp)
        return rsp

    def build_auth_invalid_response(self):
        return self.build_response(['common', 'auth-invalid'])
