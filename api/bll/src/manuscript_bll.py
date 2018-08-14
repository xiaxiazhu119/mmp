# -*- coding=utf-8 -*-

from dal.dal import ManuscriptDAL


class ManuscriptBLL(object):
    __dal = ManuscriptDAL()

    def __init__(self, *args):
        pass

    def create(self, info, author):
        return self.__dal.create(info, author)
        pass

    def edit(self, info, author):
        pass

    def get_list(self, sc):
        return self.__dal.get_list(sc)

    def create_manuscript_doc_log(self, manuscript_id, user_id, file):
        return self.__dal.create_manuscript_doc_log(manuscript_id, user_id, file)

    def update_manuscript_doc_log_mid(self, id, manuscript_id):
        return self.__dal.update_manuscript_doc_log_mid(id, manuscript_id)
