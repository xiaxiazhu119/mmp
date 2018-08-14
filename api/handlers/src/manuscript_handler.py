# -*- coding=utf-8 -*-

# from models.models import ManuscriptList
from handlers.src.base_handler import BaseHandler
from controllers.controllers import ManuscriptController
from helper.model_transfer_helper import ManuscriptInfoModelTransferHelper, ManuscriptAuthorModelTransferHelper


class ManuscriptBaseHandler(BaseHandler):

    def __init__(self):
        self.need_auth = True
        super().__init__()


class ManuscriptEditHandler(ManuscriptBaseHandler):

    def get(self, id):
        pass

    def post(self, id):
        info = self.get_request_json_data('info')
        author = self.get_request_json_data('author')

        mi_th = ManuscriptInfoModelTransferHelper()
        info_model = mi_th.transfer_to_py(info)

        ma_th = ManuscriptAuthorModelTransferHelper()
        author_model = ma_th.transfer_to_py(author)

        info_model.user_id = self.user_id

        ctrl = ManuscriptController()
        id = ctrl.create(info_model, author_model)
        return self.build_response(['manuscript', 'create', 'success'], str(id))


class ManuscriptListHandler(ManuscriptBaseHandler):

    def get(self):
        sc = self.get_request_args('data')
        if sc is None:
            return self.build_response(['manuscript', 'list', 'failed'])

        ctrl = ManuscriptController()

        data, cnt = ctrl.get_list(sc)
        # ml = ManuscriptList(*data)
        return self.build_response(['manuscript', 'list', 'success'], {
            'list': data,
            'total': cnt
        })
