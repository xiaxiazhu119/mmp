# -*- coding=utf-8 -*-

from bll.bll import ManuscriptBLL
from controllers.src.base_controller import BaseController
from models.models import ManuscriptInfo, ManuscriptAuthor


class ManuscriptController(BaseController):
    __bll = ManuscriptBLL()


    def get_info(self, id):
        return self.__bll.get_info(id)
        
    def create(self, info, author):
        return self.__bll.create(info, author)

    def edit(self, info, author):
        return self.__bll.edit(info, author)

    def get_list(self, sc):
        return self.__bll.get_list(sc)

    def update_status(self, id, status):
        return self.__bll.update_status(id, status)

    def review(self, review):
        return self.__bll.review(review)

    def store(self, manuscript_id, user_id):
        return self.__bll.store(manuscript_id, user_id)

    def confirm(self, manuscript_id, user_id):
        return self.__bll.confirm(manuscript_id, user_id)

    def publish(self, pub):
        return self.__bll.publish(pub)

    def get_latest_review(self, manuscript_id):
        return self.__bll.get_latest_review(manuscript_id)

    def get_original_info(self, manuscript_id):
        return self.__bll.get_original_info(manuscript_id)
