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

    def review(self, review):
        return self.__dal.review(review)

    def store(self, manuscript_id, user_id):
        return self.__dal.store(manuscript_id, user_id)

    def confirm(self, manuscript_id, user_id):
        return self.__dal.confirm(manuscript_id, user_id)

    def publish(self, pub):
        return self.__dal.publish(pub)

    def get_latest_review(self, manuscript_id):
        return self.__dal.get_latest_review(manuscript_id)

    def get_original_info(self, manuscript_id):
        return self.__dal.get_original_info(manuscript_id)
