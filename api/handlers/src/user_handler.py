# -*- coding=utf-8 -*-

from handlers.src.base_handler import BaseHandler
from controllers.controllers import UserController
from models.models import User, UserProfile

from helper.model_transfer_helper import UserModelTransferHelper, UserProfileModelTransferHelper
from utils.crypto import Crypto
from utils.utils import Utils

class UserBaseHandler(BaseHandler):
    
    def gen_token(self, user):
        plain_text = str(user.id) + ',' + str(user.permission_group) + ',' + Utils.now()
        crypto = Crypto()
        token = crypto.encrypt_by_aes(plain_text)
        return token
        


class UserHandler(UserBaseHandler):
    def get(self, user_id):
        pass

    def post(self, user):
        pass

    def head(self):
        pass

    def put(self):
        pass

    def delete(self):
        pass


class UserSignInHandler(UserBaseHandler):

    def __init__(self):
        self.need_auth = False
        super().__init__()

    def post(self):
        user_name = self.get_request_json_data('userName')
        pwd = self.get_request_json_data('pwd')

        if user_name is None or pwd is None:
            return self.build_response(['common', 'request-invalid'])

        ctrl = UserController()
        user = ctrl.sign_in(user_name, pwd)

        if user is None:
            return self.build_response(['user', 'sign-in', 'failed'])

        user.token_id = self.gen_token(user)
        user.pwd = ''

        return self.build_response(['user', 'sign-in', 'success'], user)


class UserSignUpHandler(UserBaseHandler):

    def __init__(self):
        self.need_auth = False
        super().__init__()

    def post(self):
        user = self.get_request_json_data('user')
        profile = self.get_request_json_data('profile')

        u_th = UserModelTransferHelper()
        user_model = u_th.transfer_to_py(user)

        up_th = UserProfileModelTransferHelper()
        profile_model = up_th.transfer_to_py(profile)

        ctrl = UserController()
        user_model = ctrl.sign_up(user_model, profile_model)

        if user_model is None:
          return self.build_response(['user', 'sign-up', 'repeat'])
            

        user_model.pwd = ''
        user_model.token_id = self.gen_token(user_model)

        return self.build_response(['user', 'sign-up', 'success'], {'user': user_model, 'profile': profile_model})


class UserPwdHandler(UserBaseHandler):

    def __init__(self):
        self.need_auth = True
        super().__init__()

    def post(self):
        data = self.get_common_request_json_data()
        ps = data.split('_')
        ctrl = UserController()
        r = ctrl.update_pwd(self.user_id, ps[0], ps[1])

        return self.build_response(['user', 'pwd', 'success' if r > 0 else 'failed'])
