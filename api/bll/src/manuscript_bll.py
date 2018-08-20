# -*- coding=utf-8 -*-

from dal.dal import ManuscriptDAL


class ManuscriptBLL(object):
    __dal = ManuscriptDAL()

    def __init__(self, *args):
        pass

    def get_info(self, id):
        return self.__dal.get_info(id)

    def create(self, info, author):
        return self.__dal.create(info, author)

    def edit(self, info, author):
        return self.__dal.edit(info, author)

    def get_list(self, sc):
        return self.__dal.get_list(sc)

    def update_status(self, id, status):
        return self.__dal.update_status(id, status)

    def create_manuscript_doc_log(self, manuscript_id, user_id, file):
        return self.__dal.create_manuscript_doc_log(manuscript_id, user_id, file)

    def update_manuscript_doc_log_mid(self, id, manuscript_id):
        return self.__dal.update_manuscript_doc_log_mid(id, manuscript_id)
