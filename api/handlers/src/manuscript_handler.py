# -*- coding=utf-8 -*-

from models.models import ManuscriptInfo, ManuscriptAuthor
from handlers.src.base_handler import BaseHandler
from controllers.controllers import ManuscriptController
from helper.model_transfer_helper import ManuscriptInfoModelTransferHelper, ManuscriptAuthorModelTransferHelper


class ManuscriptBaseHandler(BaseHandler):

    _ctrl = ManuscriptController()

    def __init__(self):
        self.need_auth = True
        super().__init__()


class ManuscriptEditHandler(ManuscriptBaseHandler):

    def get(self, id):
        data = self._ctrl.get_info(id)
        info = ManuscriptInfo(**data)
        author = ManuscriptAuthor(**data)
        author.manuscript_id = info.id
        return self.build_response(['manuscript', 'info', 'success'], {
            'info': info,
            'author': author
        }, use_encrypt=False)

    def post(self, id):
        info = self.get_request_json_data('info')
        author = self.get_request_json_data('author')

        mi_th = ManuscriptInfoModelTransferHelper()
        info_model = mi_th.transfer_to_py(info)

        ma_th = ManuscriptAuthorModelTransferHelper()
        author_model = ma_th.transfer_to_py(author)

        info_model.user_id = self.user_id
        
        func = None
        key = ''
        if info_model.id == 0:
            func = self._ctrl.create
            key = 'create'
        else:
            func = self._ctrl.edit
            key = 'edit'

        id = func(info_model, author_model)
        return self.build_response(['manuscript', key, 'success'], str(id))


class ManuscriptListHandler(ManuscriptBaseHandler):

    def get(self):
        sc = self.get_request_args('data')
        if sc is None:
            return self.build_response(['manuscript', 'list', 'failed'])

        data, cnt = self._ctrl.get_list(sc)
        # ml = ManuscriptList(*data)
        return self.build_response(['manuscript', 'list', 'success'], {
            'list': data,
            'total': cnt
        })
