# -*- coding=utf-8 -*-

from models.models import MessageInfo
from handlers.src.base_handler import BaseHandler
from controllers.controllers import MessageController
from helper.model_transfer_helper import MessageInfoModelTransferHelper


class MessageBaseHandler(BaseHandler):

    _ctrl = MessageController()

    def __init__(self):
        self.need_auth = True
        super().__init__()


class MessageEditHandler(MessageBaseHandler):

    def get(self, id):
        data = self._ctrl.get_info(id)
        info = MessageInfo(**data)
        return self.build_response(['message', 'info', 'success'], info, use_encrypt=False)

    def post(self, id):
        info = self.get_request_json_data('info')

        mi_th = MessageInfoModelTransferHelper()
        info_model = mi_th.transfer_to_py(info)

        func = None
        key = ''
        if info_model.id == 0:
            func = self._ctrl.create
            key = 'create'
        else:
            func = self._ctrl.edit
            key = 'edit'

        id = func(info_model)
        return self.build_response(['message', key, 'success'], str(id))

    def delete(self, id):
        r = self._ctrl.delete(id)
        return self.build_response(['message', 'delete', 'success'], r, use_encrypt=False)


class MessageListHandler(MessageBaseHandler):

    def get(self):
        sc = self.get_request_args('data')
        if sc is None:
            return self.build_response(['message', 'list', 'failed'])

        data, cnt = self._ctrl.get_list(sc)
        # ml = MessageList(*data)
        return self.build_response(['message', 'list', 'success'], {
            'list': data,
            'total': cnt
        }, use_encrypt=False)
