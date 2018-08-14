# -*- coding=utf-8 -*-

from bll.bll import ManuscriptBLL
from controllers.src.base_controller import BaseController
from models.models import ManuscriptInfo, ManuscriptAuthor


class ManuscriptController(BaseController):
    __bll = ManuscriptBLL()

    def create(self, info, author):
        return self.__bll.create(info, author)

    def get_list(self, sc):
        return self.__bll.get_list(sc)

    def update(self, info, author):
        pass

    # def create_manuscript_doc_log(self, manuscript_id, user_id, file):
    #     return self.__bll.create_manuscript_doc_log(manuscript_id, user_id, file)

    # def update_manuscript_doc_log_mid(self, id, manuscript_id):
    #     return self.__bll.update_manuscript_doc_log_mid(id, manuscript_id)
