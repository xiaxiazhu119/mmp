# -*- coding=utf-8 -*-

from models.models import ManuscriptInfo, ManuscriptAuthor, ManuscriptReview, ManuscriptPublish
from handlers.src.base_handler import BaseHandler
from controllers.controllers import ManuscriptController
from helper.model_transfer_helper import ManuscriptInfoModelTransferHelper, ManuscriptAuthorModelTransferHelper, ManuscriptReviewModelTransferHelper, ManuscriptPublishModelTransferHelper
from enums.enums import ManuscriptStatusEnum


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

        # info_model.user_id = self.user_id

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


class ManuscriptStatusHandler(ManuscriptBaseHandler):

    # def post(self):
    #     id = self.get_request_json_data('id')
    #     status = self.get_request_json_data('status')
    #     rc = self._ctrl.update_status(id, status)
    #     return self.build_response(['manuscript', 'status', 'success'], str(rc))

    def post(self):
        rv = self.get_request_json_data('review')
        rv_th = ManuscriptInfoModelTransferHelper()
        review = rv_th.transfer_to_py(rv)

        data, cnt = self._ctrl.get_list(sc)
        # ml = ManuscriptList(*data)
        return self.build_response(['manuscript', 'list', 'success'], {
            'list': data,
            'total': cnt
        })


class ManuscriptReviewHandler(ManuscriptBaseHandler):

    def post(self):
        rv = self.get_request_json_data('review')
        rv_th = ManuscriptReviewModelTransferHelper()
        review = rv_th.transfer_to_py(rv)

        id = self._ctrl.review(review)
        if id > 0:
            if review.status == ManuscriptStatusEnum.Stored.value:
                self._ctrl.store(review.manuscript_id, self.user_id)
            elif review.status == ManuscriptStatusEnum.Confirmed.value:
                self._ctrl.confirm(review.manuscript_id, self.user_id)

        return self.build_response(['manuscript', 'review', 'success' if id > 0 else 'failed'], id)


class ManuscriptLatestReviewHandler(ManuscriptBaseHandler):

    def get(self, manuscript_id):
        review = self._ctrl.get_latest_review(manuscript_id)
        tag = 'success'
        if review is not None:
            review = ManuscriptReview(**review)
        else:
            tag = 'failed'
        return self.build_response(['manuscript', 'latest-review', tag], review)


class ManuscriptStoreHandler(ManuscriptBaseHandler):

    def post(self):
        id = self.get_request_json_data('id')
        rst = self._ctrl.store(id, self.user_id)
        return self.build_response(['manuscript', 'store', 'success' if rst > 0 else 'failed'], rst)


class ManuscriptConfirmHandler(ManuscriptBaseHandler):

    def post(self):
        id = self.get_request_json_data('id')
        rst = self._ctrl.confirm(id, self.user_id)
        return self.build_response(['manuscript', 'confirm', 'success' if rst > 0 else 'failed'], rst)


class ManuscriptPublishHandler(ManuscriptBaseHandler):

    def post(self):
        p = self.get_request_json_data('pub')
        pub_th = ManuscriptPublishModelTransferHelper()
        pub = pub_th.transfer_to_py(p)

        id = self._ctrl.publish(pub)
        return self.build_response(['manuscript', 'publish', 'success' if id > 0 else 'failed'], id)


class ManuscriptOriginalHandler(ManuscriptBaseHandler):

    def get(self, manuscript_id):
        ori = self._ctrl.get_original_info(manuscript_id)
        rsp = None
        tag = 'success'
        if ori is not None:
            info = ManuscriptInfo(**ori)
            author = ManuscriptAuthor(**ori)
            rsp = {
                'info': info,
                'author': author
            }
        else:
            tag = 'failed'

        return self.build_response(['manuscript', 'ori', tag], rsp)
